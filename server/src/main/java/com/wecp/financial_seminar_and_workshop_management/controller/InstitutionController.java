package com.wecp.financial_seminar_and_workshop_management.controller;



import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.ResourceService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


public class InstitutionController {



    // Create Event
    @PostMapping("/api/institution/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        // create event
    }

    // Update Event
    @PutMapping("/api/institution/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        // update event
    }

    // Get Events
    @GetMapping("/api/institution/events")
    public ResponseEntity<List<Event>> getInstitutionsEvents(@RequestParam Long institutionId) {
        // get events of institution
    }

    @PostMapping("/api/institution/event/{eventId}/resource")
    public ResponseEntity<Resource> addResourceToEvent(@PathVariable Long eventId, @RequestBody Resource resource) {
        // add resource to event
    }

    @GetMapping("/api/institution/event/professionals")
    public ResponseEntity<List<User>> getProfessionalsList() {
      // get professionals list
    }

    @PostMapping("/api/institution/event/{eventId}/professional")
    public ResponseEntity<?> assignProfessionalToEvent(@PathVariable Long eventId, @RequestParam Long userId) {
     // assign professional to event
    }
}
