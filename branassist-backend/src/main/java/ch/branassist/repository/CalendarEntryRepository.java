package ch.branassist.repository;

import ch.branassist.model.CalendarEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarEntryRepository extends JpaRepository<CalendarEntry, Long> {
}
