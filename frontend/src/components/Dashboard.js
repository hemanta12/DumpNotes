import React, { useEffect, useState } from 'react'
import dashboardService from '../services/dashboardService';
import authService from '../services/authService';

const Dashboard = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [labels, setLabels] = useState('');

  const username = localStorage.getItem("username");

  useEffect( () =>{
    const fetchNotes = async () => {
      setError(null);
      try {
        const fetchedNotes = await dashboardService.getNotes();
        setNotes(fetchedNotes);
      }catch(err){
        setError('Failed to load notes');
      }finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    const noteData = {
        title,
        content,
        labels: labels.split(',').map(label => label.trim()), // Split labels by comma
    };
    setError(null);

    try {
        const newNote = await dashboardService.createNote(noteData);
        setNotes([...notes, newNote]);  // Add the new note to the list
        setTitle('');
        setContent('');
        setLabels('');
    } catch (err) {
        setError('Failed to create note');
    }
  };
  const handleLogout = async () => {
    await authService.logout();
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='dashboard' style={styles.dashboardContainer}>
       {/* Greeting and Logout */}
       <div style={styles.header}>
        <h2>Hi, {username}</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

    
     {/* Form to create a new note */}
     <form onSubmit={handleCreateNote} style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={styles.input}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={styles.textarea}
                />
                <input
                    type="text"
                    placeholder="Labels (comma separated)"
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Note</button>
            </form>

            <h2>Your Notes</h2>

            {notes.length === 0 ? (
                <p>No notes found</p>
            ) : (
                   <div style={styles.notesContainer}>
                    {notes.map((note) => (
                        <div key={note.id} style={styles.noteCard}>
                            <h3 style={styles.noteTitle}>{note.title}</h3>
                            <p style={styles.noteContent}>{note.content}</p>
                            <small style={styles.noteLabels}>
                              Labels: {note.labels.join(', ')}
                            </small>
                            <br />

                            <small style={styles.noteDate}>
                            Created at: {new Date(note.createdAt).toLocaleString()}
                            </small>
                        </div>
                    ))}
                </div>
            )}
     
     </div>
  );
};

// Inline styles
const styles = {
  dashboardContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#d9534f',
    color: 'white',
    cursor: 'pointer',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '60px',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer',
  },
  notesContainer: {
    display: 'grid',
    gap: '15px',
    marginTop: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  noteTitle: {
    fontSize: '18px',
    margin: '0 0 10px',
  },
  noteContent: {
    fontSize: '14px',
    margin: '0 0 10px',
    color: '#555',
  },
  noteLabels: {
    fontSize: '12px',
    color: '#888',
  },
  noteDate: {
    fontSize: '12px',
    color: '#aaa',
  },
};

export default Dashboard