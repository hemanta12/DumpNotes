package com.dumpnotes.backend.repository;

import com.dumpnotes.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Fetches notes associated with the user's username
    List<Note> findByUserUsername(String username);
}
