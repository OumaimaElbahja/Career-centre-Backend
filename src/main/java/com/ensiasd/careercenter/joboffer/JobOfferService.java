package com.ensiasd.careercenter.joboffer;

import java.io.IOException;
import java.util.List;

public interface JobOfferService {
    JobOffer createJobOffer(JobOfferRequest request) throws IOException;
    List<JobOffer> getAllJobOffers();
    void init();
}
