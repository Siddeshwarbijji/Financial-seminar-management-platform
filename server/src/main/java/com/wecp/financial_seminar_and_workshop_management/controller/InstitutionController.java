package com.wecp.financial_seminar_and_workshop_management.controller;

import com.wecp.financial_seminar_and_workshop_management.dto.EventDTO;
import com.wecp.financial_seminar_and_workshop_management.dto.UserDTO;
import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EnrollmentRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import com.wecp.financial_seminar_and_workshop_management.service.EnrollmentService;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.ResourceService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/institution")
public class InstitutionController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    // Create Event
    @PostMapping("/event")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        if (event.getInstitutionId() == null) {
            return new ResponseEntity<String>("Institution Id not provided", HttpStatus.BAD_REQUEST);
        }
        Event created_event = eventService.createEvent(event);
        return new ResponseEntity<Event>(created_event, HttpStatus.CREATED);
    }

    // Update Event
    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event event = eventService.updateEvent(id, eventDetails);
        if (event == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    // Get Events by institutionId
    @GetMapping("/events")
    public ResponseEntity<List<EventDTO>> getInstitutionsEvents(@RequestParam Long institutionId) {
        List<EventDTO> events = eventService.getEventsByInstitutionId(institutionId);
        if (events == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    // Get event by eventId
    @GetMapping("/event/{eventId}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long eventId) {
        return new ResponseEntity<EventDTO>(eventService.getEventById(eventId), HttpStatus.OK);
    }

    @PostMapping("/event/{eventId}/resource")
    public ResponseEntity<Resource> addResourceToEvent(@PathVariable Long eventId, @RequestBody Resource resource) {
        // add resource to event
        return new ResponseEntity<Resource>(resourceService.addResourceToEvent(eventId, resource), HttpStatus.CREATED);
    }

    @GetMapping("/event/professionals")
    public ResponseEntity<List<UserDTO>> getProfessionalsList() {
        return new ResponseEntity<List<UserDTO>>(userService.getProfessionalsList(), HttpStatus.OK);
    }

    @PostMapping("/event/{eventId}/professional")
    public ResponseEntity<?> assignProfessionalToEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        // assign professional to event
        Event event = eventService.assignUserToEventAsProfessional(eventId, userId);
        return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    // @GetMapping("/event/{eventId}/enrollments")
    // public ResponseEntity<List<Enrollment>> getEnrollmentsofEvent(@PathVariable Long eventId) {
    //     Event event = eventService.getEventById(eventId);
    //     return new ResponseEntity<List<Enrollment>>(event.getEnrollments(), HttpStatus.OK);
    // }

    @GetMapping("/event/{eventId}/feedback")
    public ResponseEntity<List<Feedback>> getEventFeedbacks(@PathVariable Long eventId) {
        List<Feedback> feedbacks = eventService.getEventFeedbacks(eventId);
        return new ResponseEntity<List<Feedback>>(feedbacks, HttpStatus.OK);
    }

    @PutMapping("/event/enrollments/{enrollmentId}")
    public ResponseEntity<Enrollment> acceptRejectEnrollment(@PathVariable Long enrollmentId) {
        // Event event = eventService.getEventById(eventId)
        Enrollment enroll = enrollmentService.getEnrollment(enrollmentId);
        if (enroll.getStatus().equalsIgnoreCase("Pending")) {
            enroll.setStatus("accepted");
        }
        return new ResponseEntity<>(enrollmentRepository.save(enroll), HttpStatus.OK);
    }
}
