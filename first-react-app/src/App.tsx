// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import Footer from './Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddNote = () => {
    if (noteInput.trim() === '') return;
    setNotes([...notes, noteInput]);
    setNoteInput('');
  };

  const handleDeleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedNotes = [...notes];
    const [movedNote] = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(index, 0, movedNote);
    setNotes(updatedNotes);
    setDraggedIndex(null);
  };

  return (
    <>
      <h1 className="header">My Calendar</h1>
 
      <div className="container text-center">
        <div className="row">
          <div>
            <Sidebar
              noteInput={noteInput}
              setNoteInput={setNoteInput}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
          <div>
            <Calendar />
          </div>
        </div>
      </div>

      <div className="min-height: 100vh">
        <Footer />
      </div>
    </>
  );
}
