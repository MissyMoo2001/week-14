import React, { useState } from 'react';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCalendarDays = (date: Date): (string | number)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarSlots: (string | number)[] = [];

    // Add empty slots
    for (let i = 0; i < firstDay; i++) {
      calendarSlots.push('');
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarSlots.push(i);
    }

    return calendarSlots;
  };

  const calendarDays = getCalendarDays(currentDate);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <div className="month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="day">{day}</div>
        ))}

        {calendarDays.map((day, index) => {
          const isNumber = typeof day === 'number';
          const classes = ['date'];
          if (isNumber && isToday(day)) classes.push('today');
          if (isNumber && isSelected(day)) classes.push('selected');

          return (
            <div
              key={index}
              className={classes.join(' ')}
              onClick={() => isNumber && handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="selected-info">
          You selected: {selectedDate.toDateString()}
        </div>
      )}
    </div>
  );
};

export default Calendar;

