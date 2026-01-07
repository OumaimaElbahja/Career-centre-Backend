package com.ensiasd.careercenter.joboffer;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class JobOfferServiceImpl implements JobOfferService {

    private final JobOfferRepository jobOfferRepository;
    private final Path rootLocation = Paths.get("uploads");

    public JobOfferServiceImpl(JobOfferRepository jobOfferRepository) {
        this.jobOfferRepository = jobOfferRepository;
    }

    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @Override
    public JobOffer createJobOffer(JobOfferRequest request) throws IOException {
        JobOffer jobOffer = JobOffer.builder()
                .content(request.getContent())
                .build();

        List<JobOfferAttachment> attachments = new ArrayList<>();
        if (request.getFiles() != null && request.getFiles().length > 0) {
            for (MultipartFile file : request.getFiles()) {
                if (!file.isEmpty()) {
                    String originalFilename = file.getOriginalFilename();
                    String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
                    Path destinationFile = this.rootLocation.resolve(Paths.get(uniqueFilename)).normalize()
                            .toAbsolutePath();

                    try (InputStream inputStream = file.getInputStream()) {
                        Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
                    }

                    JobOfferAttachment attachment = JobOfferAttachment.builder()
                            .fileName(originalFilename)
                            .filePath(uniqueFilename)
                            .fileSize(file.getSize())
                            .fileType(file.getContentType())
                            .jobOffer(jobOffer)
                            .build();
                    attachments.add(attachment);
                }
            }
        }

        jobOffer.setAttachments(attachments);
        return jobOfferRepository.save(jobOffer);
    }

    @Override
    public JobOffer updateJobOffer(Long id, JobOfferRequest request) throws IOException {
        JobOffer existingJob = jobOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job offer not found"));

        existingJob.setContent(request.getContent());

        // For simplicity, we'll keep existing attachments and add new ones
        // In a real app, you might want to delete specific attachments
        if (request.getFiles() != null && request.getFiles().length > 0) {
            List<JobOfferAttachment> newAttachments = new ArrayList<>();
            for (MultipartFile file : request.getFiles()) {
                if (!file.isEmpty()) {
                    String originalFilename = file.getOriginalFilename();
                    String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
                    Path destinationFile = this.rootLocation.resolve(Paths.get(uniqueFilename)).normalize()
                            .toAbsolutePath();

                    try (InputStream inputStream = file.getInputStream()) {
                        Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
                    }

                    JobOfferAttachment attachment = JobOfferAttachment.builder()
                            .fileName(originalFilename)
                            .filePath(uniqueFilename)
                            .fileSize(file.getSize())
                            .fileType(file.getContentType())
                            .jobOffer(existingJob)
                            .build();
                    newAttachments.add(attachment);
                }
            }
            existingJob.getAttachments().addAll(newAttachments);
        }

        return jobOfferRepository.save(existingJob);
    }

    @Override
    public void deleteJobOffer(Long id) {
        if (!jobOfferRepository.existsById(id)) {
            throw new RuntimeException("Job offer not found");
        }
        jobOfferRepository.deleteById(id);
    }

    @Override
    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAllByOrderByCreatedAtDesc();
    }
}
