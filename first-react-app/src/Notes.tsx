import React, { useState } from 'react';
import './Notes.css';

const Notes: React.FC = () => {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // to add a new note
  const handleAddNote = () => {
    if (noteInput.trim() === '') return;
    setNotes([...notes, noteInput]);
    setNoteInput('');
  };

  // to delete an existing note
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // to move notes up or down on the list
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
    <div className="notes-container">
      <h2>Notes</h2>

      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Write your note here..."
        rows={4}
        style={{ width: '100%', marginBottom: '10px', }}
      />

      <button className="button1" onClick={handleAddNote}>Add Note</button>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {notes.map((note, index) => (
          <li
            key={index}
            className="note-item"
            style={{ marginBottom: '10px', cursor: 'grab' }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <div style={{ background: 'rgb(255, 154, 131)', padding: '10px', borderRadius: '5px' }}>
              {note}
              <button
                onClick={() => handleDeleteNote(index)}
                style={{
                  float: 'right',
                  background: 'rgb(219, 80, 49)',
                  color: 'white',
                  border: 'none',
                  padding: '3px 10px',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
