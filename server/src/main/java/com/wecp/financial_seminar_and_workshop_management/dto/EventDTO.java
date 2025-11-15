package com.wecp.financial_seminar_and_workshop_management.dto;

import java.util.List;

public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String schedule;
    private String location;
    private String status;
    private String institutionName;
    private List<UserDTO> professionals;
    private List<EnrollmentDTO> enrollments;
    private List<ResourceDTO> resources;
    private List<FeedbackDTO> feedbacks;
    // private List<ResourceDTO> resources;

    public EventDTO(Long id, String title, String description, String schedule, String location, String status,
            String name,
            List<UserDTO> professionals, List<EnrollmentDTO> enrollments, List<ResourceDTO> resources,
            List<FeedbackDTO> feedbacks) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.schedule = schedule;
        this.location = location;
        this.status = status;
        institutionName = name;
        this.professionals = professionals;
        this.enrollments = enrollments;
        this.resources = resources;
        this.feedbacks = feedbacks;
    }

    public EventDTO() {
    }

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

    public List<FeedbackDTO> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<FeedbackDTO> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<UserDTO> getProfessionals() {
        return professionals;
    }

    public void setProfessionals(List<UserDTO> professionals) {
        this.professionals = professionals;
    }

    public List<EnrollmentDTO> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<EnrollmentDTO> enrollments) {
        this.enrollments = enrollments;
    }

    public List<ResourceDTO> getResources() {
        return resources;
    }

    public void setResources(List<ResourceDTO> resources) {
        this.resources = resources;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

}