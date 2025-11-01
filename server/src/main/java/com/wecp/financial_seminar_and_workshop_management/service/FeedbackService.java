package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.FeedbackRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Feedback createFeedback(Long eventId, Long userId, Feedback feedback) {

        Optional<Event> eventObj = eventRepository.findById(eventId);

        Optional<User> userObj = userRepository.findById(userId);

        if(userObj.isEmpty()){
            throw new EntityNotFoundException("User not found");
        }
        if(eventObj.isEmpty()){
            throw new EntityNotFoundException("Event not found");
        }
        feedback.setEvent(eventObj.get());
        feedback.setUser(userObj.get());
        feedback.setTimestamp(new Date());
        // return feedbackRepository.save(feedback);
        Feedback fb = feedbackRepository.save(feedback);
        userObj.get().getFeedbacks().add(fb);
        eventObj.get().getFeedbacks().add(fb);

        userRepository.save(userObj.get());
        eventRepository.save(eventObj.get());

        return fb;
    }

    // implement service methods here
}
