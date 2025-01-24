package com.jyh000223.mega_project.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer id;

    @Column(name = "task_name", nullable = false)
    private String name;

    @Column(name = "task_startdate")
    private java.sql.Date startDate;

    @Column(name = "task_deadline")
    private java.sql.Date deadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_status", nullable = false)
    private Status status;

    public enum Status {
        COMPLETED("Completed"),
        PENDING("Pending"),
        IN_PROGRESS("In Progress");

        private final String label;

        Status(String label) {
            this.label = label;
        }
    }
}
