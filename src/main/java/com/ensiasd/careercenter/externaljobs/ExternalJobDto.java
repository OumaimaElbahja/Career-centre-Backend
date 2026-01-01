package com.ensiasd.careercenter.externaljobs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ExternalJobDto {

    private String id;

    private String role;

    @JsonProperty("company_name")
    private String companyName;

    @JsonProperty("employment_type")
    private String employmentType;

    private String location;

    private boolean remote;

    private String url;

    @JsonProperty("date_posted")
    private String datePosted;

    @JsonProperty("text")
    private String description;
}
