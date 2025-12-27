package com.ensiasd.careercenter.user;

import com.ensiasd.careercenter.common.LoginResponse;
import com.ensiasd.careercenter.common.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ensiasd.careercenter.common.LoginRequest;
import com.ensiasd.careercenter.security.JwtService;

@RestController
@RequestMapping("/auth")


public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;


    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        // Vérifier confirmation mot de passe
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest()
                    .body("Les mots de passe ne correspondent pas");
        }

        User user = userService.register(
                request.getNom(),
                request.getPrenom(),
                request.getEmail(),
                request.getPassword(),
                null // rôle par défaut = STUDENT
        );


        // 2️⃣ Générer le token
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        // 3️⃣ Retourner LoginResponse avec token, role et email
        LoginResponse response = new LoginResponse(token, user.getRole().name(), user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        User user = userService.authenticate(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                new LoginResponse(token, user.getRole().name(), user.getEmail())
        );
    }



}
