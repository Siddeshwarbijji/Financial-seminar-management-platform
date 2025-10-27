package com.wecp.financial_seminar_and_workshop_management.service;


import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private EventRepository eventRepository;

    public Resource addResourceToEvent(Long eventId,Resource resource){
        Optional<Event> event=eventRepository.findById(eventId);
        if(event.isEmpty()){
            throw new EntityNotFoundException();
        }
        resource.setEvent(event.get());
        // return resourceRepository.save(resource);
        Resource temp = resourceRepository.save(resource);
        event.get().getResources().add(temp);
        eventRepository.save(event.get());
        return temp;
    }
}
