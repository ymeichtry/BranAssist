package ch.branassist.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Table(name = "calendar_entries")
public class CalendarEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // oder GenerationType.AUTO
    private Long id;
    private String title;
    private String description;
    private LocalDateTime start;
    private LocalDateTime  end;

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime  getStart() {
        return start;
    }

    public void setStart(LocalDateTime  start) {
        this.start = start;
    }

    public LocalDateTime  getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime  end) {
        this.end = end;
    }
}
