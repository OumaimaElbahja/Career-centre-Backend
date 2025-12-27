package com.ensiasd.careercenter.config;

import com.ensiasd.careercenter.user.Role;
import com.ensiasd.careercenter.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@example.com";

        if (!userService.existsByEmail(adminEmail)) {
            userService.register(
                    "admin",
                    "admin",
                    adminEmail,
                    "admin123!",
                    Role.ADMIN
            );
            System.out.println("Admin créé !");
        }else {
            System.out.println("Admin existe !");
        }

    }
}
