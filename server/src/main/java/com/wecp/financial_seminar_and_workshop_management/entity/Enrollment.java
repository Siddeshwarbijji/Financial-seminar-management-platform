package com.wecp.financial_seminar_and_workshop_management.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Enrollment {
    // implement entity

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    // @JsonBackReference("user-enrollments")
    private User user;

    @ManyToOne
    @JsonBackReference("event-enrollment")
    private Event event;

    // @Enumerated(EnumType.STRING)
    private String status; // posiible values :"Pending","Approved","Rejected"

    // public enum status{
    // PENDING,
    // APPROVED,
    // REJECTED
    // }

    public Enrollment() {
    }

    public Enrollment(Long id, User user, Event event, String status) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.status = status;
    }

    public Enrollment(User user, Event event, String status) {
        this.user = user;
        this.event = event;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
