package com.dumpnotes.backend.service;

import com.dumpnotes.backend.model.Note;
import com.dumpnotes.backend.repository.NoteRepository;
import com.dumpnotes.backend.model.User;

import com.dumpnotes.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to get notes for a specific username
    public List<Note> getNotesByUsername(String username) {
        return noteRepository.findByUserUsername(username);
    }

    public Note createNoteForUser(Note note, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        note.setUser(user); // Set the user for the note
        return noteRepository.save(note); // Save the note
    }
}
