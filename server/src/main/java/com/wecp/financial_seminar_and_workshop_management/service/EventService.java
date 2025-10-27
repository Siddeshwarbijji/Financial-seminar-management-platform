package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event eventObj = eventRepository.findById(id).orElse(null);
        if (eventObj != null) {
            eventObj.setTitle(eventDetails.getTitle());
            eventObj.setDescription(eventDetails.getDescription());
            eventObj.setSchedule(eventDetails.getSchedule());
            eventObj.setLocation(eventDetails.getLocation());
            eventObj.setStatus(eventDetails.getStatus());
            return eventRepository.save(eventObj);
        }
        return null;
    }

    public List<Event> getEventsByInstitutionId(Long id) {
        return eventRepository.findByInstitutionId(id);
        // return null;
    }

    public Event getEventById(Long eventId){
        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isEmpty()){
            throw new EntityNotFoundException("Event with id "+ eventId +" not found");
        }
        return event.get();
    }

    public Event assignUserToEventAsProfessional(Long eventId, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
                throw new EntityNotFoundException("User Id not found");
        }

        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isEmpty()) {
            throw new EntityNotFoundException("Event Id not found");
        }
        user.get().getEvents().add(event.get());
        userRepository.save(user.get());

        event.get().getProfessionals().add(user.get());
        return eventRepository.save(event.get());
    }

    // public List<Event> viewAssignedEvents(Long eventId, Long userId)
    public List<Event> getAssignedEvents(Long userId)// doutbt
    {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {

        }
        return user.get().getEvents();
    }

    public Event updateEventStatus(Long id, String status) {
        // Optional<Event> eventObj = eventRepository.findById(id);
        Event eventObj = eventRepository.findById(id).orElse(null);
        if (eventObj != null) {
            eventObj.setStatus(status);
            return eventRepository.save(eventObj);
        }
        return null;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event viewEventStatus(Long id) {
        Event eventObj = eventRepository.findById(id).orElse(null);
        if (eventObj == null) {
            throw new RuntimeException("Event not found");
        }
        return eventObj;
    }

    // public Event getEventById(Long id) {
    //     if (eventRepository.existsById(id)) {
    //         return eventRepository.findById(id).get();
    //     }
    //     return null;
    // }
}
