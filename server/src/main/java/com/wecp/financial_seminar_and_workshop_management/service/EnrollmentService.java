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
import java.util.Optional;

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
        Optional<User> userObj = userRepository.findById(userId);
        if(userObj.isEmpty())
        {
            System.out.println("here");
            throw new EntityNotFoundException("User not found with ID: "+userId);
        }
        if(!userObj.get().getRole().equals("PARTICIPANT")){
            throw new RuntimeException("Only participant can enroll");
        }
        Optional<Event> eventObj = eventRepository.findById(eventId);
        if(eventObj.isEmpty())
        {
            throw new EntityNotFoundException("Event not found with ID: "+eventId);
        }
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(userObj.get());
        enrollment.setEvent(eventObj.get());
        enrollment.setStatus("PENDING");
        // return enrollmentRepository.save(enrollment);
        Enrollment temp = enrollmentRepository.save(enrollment);
        userObj.get().getEnrollments().add(temp);
        eventObj.get().getEnrollments().add(temp);
        userRepository.save(userObj.get());
        eventRepository.save(eventObj.get());
        return temp;
    }

    public Enrollment getEnrollment(Long id){
        Optional<Enrollment> enrollment = enrollmentRepository.findById(id);
        if(enrollment.isEmpty()){
            throw new EntityNotFoundException("Enrollment not found");
        }
        return enrollment.get();
    }
}
