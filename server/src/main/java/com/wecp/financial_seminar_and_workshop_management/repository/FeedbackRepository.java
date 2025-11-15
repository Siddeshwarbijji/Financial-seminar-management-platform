package com.wecp.financial_seminar_and_workshop_management.repository;


import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    // implement repository
    @Query("select f from Feedback f where f.event.id = :eventId")
    List<Feedback> findByEventId(@Param("eventId") Long eventId);
    
    @Query("select f from Feedback f where f.user.id = :userId")
    List<Feedback> findByUserId(@Param("userId") Long userId);
}
