package ch.branassist.controller;

import ch.branassist.model.CalendarEntry;
import ch.branassist.service.CalendarEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/calendar")
public class CalendarEntryController {

    private final CalendarEntryService calendarEntryService;

    @Autowired
    public CalendarEntryController(CalendarEntryService calendarEntryService) {
        this.calendarEntryService = calendarEntryService;
    }

    // Create a new Calendar Entry
    @PostMapping("/add")
    public ResponseEntity<CalendarEntry> addCalendarEntry(@RequestBody CalendarEntry calendarEntry) {
        CalendarEntry savedEntry = calendarEntryService.addCalendarEntry(calendarEntry);
        return ResponseEntity.ok(savedEntry);
    }

    // Get all Calendar Entries
    @GetMapping("/entries")
    public ResponseEntity<List<CalendarEntry>> getAllCalendarEntries() {
        List<CalendarEntry> entries = calendarEntryService.getAllCalendarEntries();
        return ResponseEntity.ok(entries);
    }

    // Get Calendar Entry by ID
    @GetMapping("/entry/{id}")
    public ResponseEntity<CalendarEntry> getEntryById(@PathVariable Long id) {
        CalendarEntry entry = calendarEntryService.getEntryById(id);
        if (entry != null) {
            return ResponseEntity.ok(entry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a Calendar Entry
    @PutMapping("/entry/{id}")
    public ResponseEntity<CalendarEntry> updateCalendarEntry(
            @PathVariable Long id,
            @RequestBody CalendarEntry updatedEntry) {

        CalendarEntry entry = calendarEntryService.getEntryById(id);
        if (entry != null) {
            entry.setTitle(updatedEntry.getTitle());
            entry.setDescription(updatedEntry.getDescription());
            entry.setStart(updatedEntry.getStart());
            entry.setEnd(updatedEntry.getEnd());
            CalendarEntry savedEntry = calendarEntryService.addCalendarEntry(entry);
            return ResponseEntity.ok(savedEntry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Calendar Entry
    @DeleteMapping("/entry/{id}")
    public ResponseEntity<Void> deleteCalendarEntry(@PathVariable Long id) {
        calendarEntryService.deleteCalendarEntry(id);
        return ResponseEntity.noContent().build();
    }
}
