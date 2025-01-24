package com.jyh000223.mega_project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Integer id;
    private String name;
    private Date startDate;
    private Date deadline;
    private String status; // Enum 값이 들어옵니다 ('Completed', 'Pending', 'In Progress')
}
