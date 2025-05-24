// src/Sidebar.tsx
import React from 'react';


interface SidebarProps {
  noteInput: string;
  setNoteInput: React.Dispatch<React.SetStateAction<string>>;
  notes: string[];
  onAddNote: () => void;
  onDeleteNote: (index: number) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  noteInput,
  setNoteInput,
  notes,
  onAddNote,
  onDeleteNote,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <>
    <div className="notes-container row" style={{ padding: '1rem', fontFamily: 'Georgia, serif'}}>
      
      {/* Text Area Section */}
      <div className="note-input-section col-md-4" style={{ marginBottom: '2rem' }}>
        <h4>New Notes</h4>
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Write your note here..."
          rows={4}
          style={{background: 'rgb(254, 209, 199)'}}
        />
        <button className="button1" 
        onClick={onAddNote}
        style={{background: 'rgb(255, 78, 38)', color: 'white', borderColor: 'rgba(255, 78, 38, 0.34)'}}>
          Add Note
        </button>
      </div>

      {/* Notes List Section */}
      <div className="note-list-section col-md-8">
        <h4>Your Notes</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((note, index) => (
            <li
              key={index}
              className="note-item"
              style={{ marginBottom: '10px', cursor: 'grab' }}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(index)}
            >
              <div style={{
                background: 'rgb(255, 154, 131)',
                padding: '10px',
                borderRadius: '5px',
                position: 'relative'
              }}>
                {note}
                <button
                  onClick={() => onDeleteNote(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgb(219, 80, 49)',
                    color: 'white',
                    border: 'none',
                    padding: '3px 10px',
                    borderRadius: '3px',
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
