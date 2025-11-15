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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    public List<EventDTO> getEventsByInstitutionId(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with ID " + id + " not found");
        }
        List<Event> events = eventRepository.findByInstitutionId(id);
        List<EventDTO> response = new ArrayList<>();
        for (Event event : events) {
            EventDTO eventDTO = new EventDTO();
            eventDTO.setId(event.getId());
            eventDTO.setLocation(event.getLocation());
            eventDTO.setDescription(event.getDescription());
            eventDTO.setSchedule(event.getSchedule());
            eventDTO.setTitle(event.getTitle());
            eventDTO.setStatus(event.getStatus());
            response.add(eventDTO);
        }
        return response;
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
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Event> eventOpt = eventRepository.findById(eventId);

        if (userOpt.isEmpty()) {
            throw new EntityNotFoundException("User Id not found");
        }
        if (eventOpt.isEmpty()) {
            throw new EntityNotFoundException("Event Id not found");
        }
        User user = userOpt.get();
        Event newEvent = eventOpt.get();

        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime newStart = LocalDateTime.parse(newEvent.getSchedule(), formatter);
        LocalDateTime newEnd = newStart.plusHours(2); // Assuming 2-hour duration

        for (Event existingEvent : user.getEvents()) {
            LocalDateTime existingStart = LocalDateTime.parse(existingEvent.getSchedule(), formatter);
            LocalDateTime existingEnd = existingStart.plusHours(2); // Same duration assumption

            boolean isOverlapping = !newEnd.isBefore(existingStart) && !newStart.isAfter(existingEnd);
            if (isOverlapping) {
                throw new IllegalStateException(
                        "Professional already assigned to another event that overlaps in time.");
            }
        }

        // Assign if no conflict
        user.getEvents().add(newEvent);
        userRepository.save(user);

        newEvent.getProfessionals().add(user);
        return eventRepository.save(newEvent);
    }

    // public List<Event> viewAssignedEvents(Long eventId, Long userId)
    public List<EventDTO> getAssignedEvents(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with Id " + userId + " not found");
        }
        List<Event> events = user.get().getEvents();
        List<EventDTO> response = new ArrayList<>();
        for (Event event : events) {
            EventDTO eventDTO = new EventDTO();
            eventDTO.setId(event.getId());
            eventDTO.setLocation(event.getLocation());
            eventDTO.setDescription(event.getDescription());
            eventDTO.setSchedule(event.getSchedule());
            eventDTO.setTitle(event.getTitle());
            eventDTO.setStatus(event.getStatus());
            response.add(eventDTO);
        }
        return response;
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
        Long institutionId = event.getInstitutionId();
        User institution = userRepository.findById(institutionId).get();
        List<UserDTO> professionals = event.getProfessionals().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());

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
                institution.getUsername(),
                professionals,
                enrollments,
                resources,
                feedbacks);
    }

}