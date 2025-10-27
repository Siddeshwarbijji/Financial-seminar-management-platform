package com.wecp.financial_seminar_and_workshop_management.controller;


import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.service.EnrollmentService;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


public class ParticipantController {



    @GetMapping("/api/participant/events")
    public ResponseEntity<List<Event>> getEvents() {
        // Get all events
    }

    @PostMapping("/api/participant/event/{eventId}/enroll")
    public ResponseEntity<Enrollment> enrollInEvent(@RequestParam Long userId, @PathVariable Long eventId) {
     // Enroll in event
    }

    @GetMapping("/api/participant/event/{id}/status")
    public ResponseEntity<Event> viewEventStatus(@PathVariable Long id) {
        // view event by event id
    }

    @PostMapping("/api/participant/event/{eventId}/feedback")
    public ResponseEntity<Feedback> provideFeedback(@RequestParam Long userId, @PathVariable Long eventId, @RequestBody Feedback feedback) {
        // Provide feedback for event
    }
}
