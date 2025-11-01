package com.wecp.financial_seminar_and_workshop_management.dto;

public class FeedbackDTO {
    private Long id;
    private String content;
    private String username;
    // private String email;
    public FeedbackDTO(Long id, String content, String username) {
        this.id = id;
        this.content = content;
        this.username = username;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    // public String getEmail() {
    //     return email;
    // }
    // public void setEmail(String email) {
    //     this.email = email;
    // }

    
}
