package com.jyh000223.mega_project.DTO;

import java.time.LocalDate;

public class ProjectDTO {
    private int project_id;
    private String projectName;
    private String project_manager;
    private LocalDate startdate;
    private LocalDate deadline;

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }
    public int getProject_id() {
        return project_id;
    }
    public void setProject_name(String projectName) {
        this.projectName = projectName;
    }
    public String getProjectName() {
        return projectName;
    }
    public void setProject_manager(String project_manager) {
        this.project_manager = project_manager;
    }
    public String getProject_manager() {
        return project_manager;
    }
    public void setStartdate(LocalDate startdate) {
        this.startdate = startdate;
    }
    public LocalDate getStartdate() {
        return startdate;
    }
    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
    public LocalDate getDeadline() {
        return deadline;
    }

}

