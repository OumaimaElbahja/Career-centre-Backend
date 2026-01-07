package com.ensiasd.careercenter.joboffer;

import java.io.IOException;
import java.util.List;

public interface JobOfferService {
    JobOffer createJobOffer(JobOfferRequest request) throws IOException;

    JobOffer updateJobOffer(Long id, JobOfferRequest request) throws IOException;

    void deleteJobOffer(Long id);

    List<JobOffer> getAllJobOffers();

    void init();
}
