package com.jyh000223.mega_project.DTO;


public class TeammateDTO {

    private int indexTeam;

    private int projectId;
    private String userId;
    private String projectManager;

    public int getIndexTeam() {
        return indexTeam;
    }
    public void setIndexTeam(int indexTeam) {
        this.indexTeam = indexTeam;
    }
    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }
    public String getProjectManager() {
        return projectManager;
    }

}
