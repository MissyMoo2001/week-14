import React, { useState } from 'react';
import './Notes.css';

const Notes: React.FC = () => {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  const handleAddNote = () => {
    if (noteInput.trim() === '') return;
    setNotes([...notes, noteInput]);
    setNoteInput('');
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>

      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Write your note here..."
        rows={4}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button onClick={handleAddNote}>Add Note</button>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {notes.map((note, index) => (
          <li key={index} className="note-item" style={{ marginBottom: '10px' }}>
            <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
              {note}
              <button
                onClick={() => handleDeleteNote(index)}
                style={{ float: 'right', background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
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
