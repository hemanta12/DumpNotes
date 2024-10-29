import React, { useEffect, useState } from 'react'
import dashboardService from '../services/dashboardService';
import authService from '../services/authService';
import '../css/Dashboard.css'

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
    <div className='dashboard'>
       {/* Greeting and Logout */}
       <div className='dashboard-header'>
        <h2>Hi, {username}</h2>
        <button onClick={handleLogout} className='dashboard-logout-button'>Logout</button>
      </div>

    
     {/* Form to create a new note */}
     <form onSubmit={handleCreateNote} className='dashboard-form-container'>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className='dashboard-input'
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className='dashboard-textarea'
                />
                <input
                    type="text"
                    placeholder="Labels (comma separated)"
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    className='dashboard-input'
                />
                <button type="submit" className='dashboard-button'>Add Note</button>
            </form>

            <h2>Your Notes</h2>

            {notes.length === 0 ? (
                <p>No notes found</p>
            ) : (
                   <div className='dashboard-notes-container'>
                    {notes.map((note) => (
                        <div key={note.id} className='dashboard-note-card'>
                            <h3 className='dashboard-note-title'>{note.title}</h3>
                            <p className='dashboard-note-content'>{note.content}</p>
                            <small className='dashboard-note-labels'>
                              Labels: {note.labels.join(', ')}
                            </small>
                            <br />

                            <small className='dashboard-note-date'>
                            Created at: {new Date(note.createdAt).toLocaleString()}
                            </small>
                        </div>
                    ))}
                </div>
            )}
     
     </div>
  );
};

export default Dashboard