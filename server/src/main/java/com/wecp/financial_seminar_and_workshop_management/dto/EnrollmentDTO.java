package com.wecp.financial_seminar_and_workshop_management.dto;

public class EnrollmentDTO {
    private Long id;
    private String status;
    private UserDTO participant;
    public EnrollmentDTO(Long id, String status, UserDTO participant) {
        this.id = id;
        this.status = status;
        this.participant = participant;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public UserDTO getParticipant() {
        return participant;
    }
    public void setParticipant(UserDTO participant) {
        this.participant = participant;
    }
    
}
