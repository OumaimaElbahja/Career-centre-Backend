package com.ensiasd.careercenter.joboffer;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class JobOfferRequest {
    private String content;
    private MultipartFile[] files;
}
