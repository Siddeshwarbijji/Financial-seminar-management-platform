package com.wecp.financial_seminar_and_workshop_management.service;


import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EnrollmentRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class EnrollmentService {
    // implement service methods here

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    

    @Autowired
    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserRepository userRepository,
            EventRepository eventRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Enrollment enrollInEvent(Long userId,Long eventId)
    {
        User userObj = userRepository.findById(userId).get();
        if(userObj == null)
        {
            throw new EntityNotFoundException("User not found with ID: "+userId);
        }
        Event eventObj = eventRepository.findById(eventId).get();
        if(eventObj == null)
        {
            throw new EntityNotFoundException("Event not found with ID: "+eventId);
        }
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(userObj);
        enrollment.setEvent(eventObj);
        enrollment.setStatus(eventObj.getStatus());
        return enrollmentRepository.save(enrollment);
    }
}
