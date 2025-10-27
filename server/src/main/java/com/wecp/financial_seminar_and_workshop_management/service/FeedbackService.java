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

    public Feedback createFeedback(Long eventId, Long userId, Feedback feedback){

        Optional<Event> eventObj =  eventRepository.findById(eventId);

        Optional<User> userObj = userRepository.findById(userId);

        if((!eventObj.isEmpty() || eventObj!=null) && (!userObj.isEmpty() || userObj!=null)){
        feedback.setEvent(eventObj.get());
        feedback.setUser(userObj.get());
        feedback.setTimestamp(new Date());
        }
        return feedbackRepository.save(feedback);
        
    }
    
    // implement service methods here
}
