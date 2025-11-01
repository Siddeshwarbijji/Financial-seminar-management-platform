package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.dto.EnrollmentDTO;
import com.wecp.financial_seminar_and_workshop_management.dto.EventDTO;
import com.wecp.financial_seminar_and_workshop_management.dto.FeedbackDTO;
import com.wecp.financial_seminar_and_workshop_management.dto.ResourceDTO;
import com.wecp.financial_seminar_and_workshop_management.dto.UserDTO;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createEvent(Event event) {
        Optional<User> institution = userRepository.findById(event.getInstitutionId());
        if (institution.isPresent() && !institution.get().getRole().equals("INSTITUTION")) {
            throw new EntityNotFoundException("Institution not found");
        }
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event eventObj = eventRepository.findById(id).orElse(null);
        if (eventObj == null) {
            throw new EntityNotFoundException("Event with ID " + id + " not found");
        }
        eventObj.setTitle(eventDetails.getTitle());
        eventObj.setDescription(eventDetails.getDescription());
        eventObj.setSchedule(eventDetails.getSchedule());
        eventObj.setLocation(eventDetails.getLocation());
        eventObj.setStatus(eventDetails.getStatus());
        return eventRepository.save(eventObj);
    }

    public List<Event> getEventsByInstitutionId(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with ID " + id + " not found");
        }
        return eventRepository.findByInstitutionId(id);
    }

    public EventDTO getEventById(Long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isEmpty()) {
            throw new EntityNotFoundException("Event with id " + eventId + " not found");
        }
        // return event.get();
        EventDTO eventDTO = mapToEventDTO(event.get());
        return eventDTO;
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
            throw new EntityNotFoundException("User with Id " + userId + " not found");
        }
        return user.get().getEvents();
    }

    public Event updateEventStatus(Long id, String status) {
        Optional<Event> eventObj = eventRepository.findById(id);
        if (eventObj.isEmpty()) {
            throw new EntityNotFoundException("Event with ID " + id + " not found");
        }
        eventObj.get().setStatus(status);
        return eventRepository.save(eventObj.get());
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

    public List<Feedback> getEventFeedbacks(Long id) {
        Optional<Event> eventObj = eventRepository.findById(id);
        if (eventObj.isEmpty()) {
            throw new EntityNotFoundException("Event not found");
        }
        return eventObj.get().getFeedbacks();
    }

    // public Event getEventById(Long id) {
    // if (eventRepository.existsById(id)) {
    // return eventRepository.findById(id).get();
    // }
    // return null;
    // }

    public EventDTO mapToEventDTO(Event event) {
        List<UserDTO> professionals = event.getProfessionals().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());

        // List<UserDTO> participants = event.getEnrollments().stream()
        // .map(enrollment -> {
        // User user = enrollment.getUser();
        // return new UserDTO(user.getId(), user.getUsername(), user.getEmail(),
        // user.getRole());
        // })
        // .collect(Collectors.toList());

        List<EnrollmentDTO> enrollments = event.getEnrollments().stream()
                .map(enrollment -> {
                    User user = enrollment.getUser();
                    UserDTO participantDto = new UserDTO(user.getId(), user.getUsername(), user.getEmail(),
                            user.getRole());
                    return new EnrollmentDTO(enrollment.getId(), enrollment.getStatus(), participantDto);
                })
                .collect(Collectors.toList());

        List<ResourceDTO> resources = event.getResources().stream()
                .map(resource -> new ResourceDTO(resource.getId(), resource.getDescription(),
                        resource.getType(), resource.getAvailabilityStatus()))
                .collect(Collectors.toList());

        List<FeedbackDTO> feedbacks = event.getFeedbacks().stream()
                .map(fb -> new FeedbackDTO(fb.getId(), fb.getContent(), fb.getUser().getUsername()))
                .collect(Collectors.toList());
        
        return new EventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getSchedule(),
                event.getLocation(),
                event.getStatus(),
                professionals,
                enrollments,
                resources,
                feedbacks);
    }

}