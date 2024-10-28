package com.dumpnotes.backend.controller;

import com.dumpnotes.backend.model.Note;
import com.dumpnotes.backend.repository.NoteRepository;
import com.dumpnotes.backend.service.NoteService;
// import com.dumpnotes.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    // @Autowired
    // private UserService userService;
    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getUserNotes(Authentication authentication) {
        // Fetch the notes for the currently authenticated user
        String username = authentication.getName();
        // Fetch notes for the authenticated user via NoteService
        List<Note> notes = noteService.getNotesByUsername(username);
        // List<Note> notes = noteRepository.findByUserUsername(username); // Assuming
        // you have this method
        return ResponseEntity.ok(notes);
    }

    // New endpoint to create a note
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note, Authentication authentication) {
        String username = authentication.getName();
        Note createdNote = noteService.createNoteForUser(note, username);
        return ResponseEntity.ok(createdNote);
    }
}
