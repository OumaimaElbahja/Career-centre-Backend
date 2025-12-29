package com.ensiasd.careercenter.joboffer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {

    List<JobOffer> findAllByOrderByCreatedAtDesc();
}

