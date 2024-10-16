package ch.branassist.service;

import ch.branassist.model.CalendarEntry;
import ch.branassist.repository.CalendarEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarEntryService {

    private final CalendarEntryRepository calendarEntryRepository;

    @Autowired
    public CalendarEntryService(CalendarEntryRepository calendarEntryRepository) {
        this.calendarEntryRepository = calendarEntryRepository;
    }

    public CalendarEntry addCalendarEntry(CalendarEntry calendarEntry) {
        return calendarEntryRepository.save(calendarEntry);
    }

    public List<CalendarEntry> getAllCalendarEntries() {
        return calendarEntryRepository.findAll();
    }

    public CalendarEntry getEntryById(Long id) {
        return calendarEntryRepository.findById(id).orElse(null);
    }

    public void deleteCalendarEntry(Long id) {
        calendarEntryRepository.deleteById(id);
    }
}
