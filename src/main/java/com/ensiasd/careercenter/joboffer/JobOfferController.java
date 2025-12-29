package com.ensiasd.careercenter.joboffer;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class JobOfferController {

    private final JobOfferService jobOfferService;

    @PostMapping(path = "/admin/job-offers", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobOffer> createJobOffer(@ModelAttribute JobOfferRequest request) {
        try {
            JobOffer createdJobOffer = jobOfferService.createJobOffer(request);
            return new ResponseEntity<>(createdJobOffer, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/job-offers")
    public ResponseEntity<List<JobOffer>> getAllJobOffers() {
        List<JobOffer> jobOffers = jobOfferService.getAllJobOffers();
        return ResponseEntity.ok(jobOffers);
    }
}
