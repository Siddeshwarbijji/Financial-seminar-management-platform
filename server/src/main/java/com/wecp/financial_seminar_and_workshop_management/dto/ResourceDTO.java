package com.wecp.financial_seminar_and_workshop_management.dto;

public class ResourceDTO {
    private Long id;
    private String type;
    private String description;
    private String availabilityStatus;
    public ResourceDTO(Long id, String type, String description, String availabilityStatus) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.availabilityStatus = availabilityStatus;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getAvailabilityStatus() {
        return availabilityStatus;
    }
    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
    
}
