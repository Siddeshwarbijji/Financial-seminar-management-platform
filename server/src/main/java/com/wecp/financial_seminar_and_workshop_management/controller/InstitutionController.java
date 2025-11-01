package com.wecp.financial_seminar_and_workshop_management.controller;



import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.ResourceService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institution")
public class InstitutionController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    // Create Event
    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event created_event = eventService.createEvent(event);
        return new ResponseEntity<Event>(created_event, HttpStatus.CREATED);
    }

    // Update Event
    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event event = eventService.updateEvent(id, eventDetails);
        if(event == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    // Get Events
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getInstitutionsEvents(@RequestParam Long institutionId) {
        List<Event> events = eventService.getEventsByInstitutionId(institutionId);
        if(events == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("/event/{eventId}/resource")
    public ResponseEntity<Resource> addResourceToEvent(@PathVariable Long eventId, @RequestBody Resource resource) {
        // add resource to event
        return new ResponseEntity<Resource>(resourceService.addResourceToEvent(eventId, resource),HttpStatus.CREATED);
    }

    @GetMapping("/event/professionals")
    public ResponseEntity<List<User>> getProfessionalsList() {
        return new ResponseEntity<>(userService.getProfessionalsList(), HttpStatus.OK);
      // get professionals list
    }

    @PostMapping("/event/{eventId}/professional")
    public ResponseEntity<?> assignProfessionalToEvent(@PathVariable Long eventId, @RequestParam Long userId) {
     // assign professional to event
     Event event = eventService.assignUserToEventAsProfessional(eventId, userId);
     return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    @GetMapping("/event/{eventId}/enrollments")
    public ResponseEntity<List<Enrollment>> getEnrollmentsofEvent(@PathVariable Long eventId){
        // System.out.println("Here");
        Event event = eventService.getEventById(eventId);
        return new ResponseEntity<List<Enrollment>>(event.getEnrollments(), HttpStatus.OK);
    }
}
