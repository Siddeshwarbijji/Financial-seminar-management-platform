package com.wecp.financial_seminar_and_workshop_management.controller;



import com.wecp.financial_seminar_and_workshop_management.dto.EventDTO;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProfessionalController {


    private final EventService eventService;

    private final FeedbackService feedbackService;

    
    @Autowired
    public ProfessionalController(EventService eventService,FeedbackService feedbackService) {
        this.eventService = eventService;
        this.feedbackService = feedbackService;
    }

    @GetMapping("/api/professional/events")
    public ResponseEntity<List<EventDTO>> viewAssignedEvents(@RequestParam Long userId) {
        // view assigned events
        return new ResponseEntity<List<EventDTO>>(eventService.getAssignedEvents(userId),HttpStatus.OK);
    }

    @PutMapping("/api/professional/event/{id}/status")
    public ResponseEntity<Event> updateEventStatus(@PathVariable Long id, @RequestParam String status) {
        // update event status
        return new ResponseEntity<Event>(eventService.updateEventStatus(id, status),HttpStatus.OK);
    }

    @PostMapping("/api/professional/event/{eventId}/feedback")
    public ResponseEntity<Feedback> provideFeedback(@PathVariable Long eventId, @RequestParam Long userId, @RequestBody Feedback feedback) {
        // provide feedback
        return new ResponseEntity<Feedback>(feedbackService.createFeedback(eventId, userId, feedback), HttpStatus.CREATED);

    }
}

