package com.ensiasd.careercenter.joboffer;

import com.ensiasd.careercenter.joboffer.JobOfferAttachment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "job_offers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "jobOffer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<JobOfferAttachment> attachments;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}