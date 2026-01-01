package com.ensiasd.careercenter.externaljobs;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/external-job-offers")
public class ExternalJobController {

    private final FindworkService findworkService;

    public ExternalJobController(FindworkService findworkService) {
        this.findworkService = findworkService;
    }

    @GetMapping
    public List<ExternalJobDto> getExternalJobOffers() {
        return findworkService.fetchJobs();
    }
}
