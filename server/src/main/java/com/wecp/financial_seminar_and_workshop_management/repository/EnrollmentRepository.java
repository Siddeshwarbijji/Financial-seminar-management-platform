package com.wecp.financial_seminar_and_workshop_management.repository;

import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long>{

    // implement repository
    @Query("select e from Enrollment e where e.user.id = :userId")
    List<Enrollment> findByUserId(Long userId);
}
