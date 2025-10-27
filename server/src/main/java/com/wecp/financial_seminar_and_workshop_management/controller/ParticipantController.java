package com.wecp.financial_seminar_and_workshop_management.controller;


import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import com.wecp.financial_seminar_and_workshop_management.service.EnrollmentService;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

@RestController

public class ParticipantController {


    private final EnrollmentService enrollmentService;
    private final EventService eventService;
    private final FeedbackService feedbackService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ParticipantController(EnrollmentService enrollmentService, EventService eventService,FeedbackService feedbackService) {
        this.enrollmentService = enrollmentService;
        this.eventService = eventService;
        this.feedbackService = feedbackService;
    }

    @GetMapping("/api/participant/events")
    public ResponseEntity<List<Event>> getEvents() {
        // Get all events
        return new ResponseEntity<List<Event>>(eventService.getAllEvents(),HttpStatus.OK);
    }

    @PostMapping("/api/participant/event/{eventId}/enroll")
    public ResponseEntity<Enrollment> enrollInEvent(@RequestParam Long userId, @PathVariable Long eventId) {
     // Enroll in event
            return new ResponseEntity<Enrollment>(enrollmentService.enrollInEvent(userId, eventId), HttpStatus.CREATED);

    }

    @GetMapping("/api/participant/event/{id}/status")
    public ResponseEntity<Event> viewEventStatus(@PathVariable Long id) {
        // view event by event id

        return new ResponseEntity<Event>(eventService.viewEventStatus(id), HttpStatus.OK);
    }

    @PostMapping("/api/participant/event/{eventId}/feedback")
    public ResponseEntity<Feedback> provideFeedback(@RequestParam Long userId, @PathVariable Long eventId, @RequestBody Feedback feedback) {
        // Provide feedback for event

        return new ResponseEntity<Feedback>(feedbackService.createFeedback(eventId, userId, feedback), HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/participant/enrolled-events")
    public ResponseEntity<Set<Enrollment>> getEnrolledEvents(@RequestParam Long userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new EntityNotFoundException("User not found with Id "+userId);
        }
        return new ResponseEntity<Set<Enrollment>>(user.get().getEnrollments(), HttpStatus.OK);
    }

    @GetMapping("/api/participant")
    public ResponseEntity<User> getUserById(@RequestParam Long userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new EntityNotFoundException("User not found with Id "+userId);
        }
        return new ResponseEntity<User>(user.get(), HttpStatus.OK);
    }
}
