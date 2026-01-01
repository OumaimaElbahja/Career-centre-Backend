package com.ensiasd.careercenter.externaljobs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Collections;

@Service
public class FindworkService {

    private static final Logger logger = LoggerFactory.getLogger(FindworkService.class);

    private final RestClient restClient;

    @Value("${findwork.api.token}")
    private String apiToken;

    @Value("${findwork.api.url}")
    private String apiUrl;

    public FindworkService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    public List<ExternalJobDto> fetchJobs() {
        try {
            logger.info("Fetching external jobs for search: developer");

            java.net.URI uri = org.springframework.web.util.UriComponentsBuilder
                    .fromHttpUrl(apiUrl)
                    .queryParam("search", "developer")
                    .queryParam("sort_by", "date")
                    .build()
                    .toUri();

            ExternalJobResponse response = restClient.get()
                    .uri(uri)
                    .header("Authorization", "Token " + apiToken)
                    .retrieve()
                    .body(ExternalJobResponse.class);

            if (response != null && response.getResults() != null) {
                return response.getResults();
            }
        } catch (Exception e) {
            logger.error("Error fetching external jobs", e);
        }
        return Collections.emptyList();
    }

    // Helper record to handle the response structure which usually has a count and
    // results array
    private static class ExternalJobResponse {
        private List<ExternalJobDto> results;

        public List<ExternalJobDto> getResults() {
            return results;
        }

        public void setResults(List<ExternalJobDto> results) {
            this.results = results;
        }
    }
}
