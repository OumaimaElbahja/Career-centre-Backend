export interface JobOffer {
    id: number;
    content: string;
    createdAt: string;
    attachments: JobOfferAttachment[];
}

export interface JobOfferAttachment {
    id: number;
    fileName: string;
    fileUrl: string; // Assuming we'll construct or receive a URL
}

export interface ExternalJobDto {
    id: string;
    role: string;
    company_name: string;
    employment_type: string;
    location: string;
    remote: boolean;
    url: string;
    date_posted: string;
    text: string;
}

export interface AuthResponse {
    token: string;
    role: string;
    email: string;
}
