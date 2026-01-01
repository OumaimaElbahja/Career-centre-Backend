package com.ensiasd.careercenter.externaljobs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.ensiasd.careercenter.security.JwtService;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(controllers = ExternalJobController.class)
public class ExternalJobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FindworkService findworkService;

    @MockBean
    private JwtService jwtService; // Mocking JwtService as it might be required by security config

    @Test
    @WithMockUser
    public void testGetExternalJobOffers() throws Exception {
        ExternalJobDto job = new ExternalJobDto();
        job.setId("1");
        job.setRole("Developer");
        job.setCompanyName("Tech Corp");

        List<ExternalJobDto> jobs = Collections.singletonList(job);

        when(findworkService.fetchJobs()).thenReturn(jobs);

        mockMvc.perform(get("/api/external-job-offers").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].role").value("Developer"))
                .andExpect(jsonPath("$[0].company_name").value("Tech Corp"));
    }
}
