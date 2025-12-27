package com.ensiasd.careercenter.user;

import com.ensiasd.careercenter.common.exception.AuthException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(String nom,
                         String prenom,
                         String email,
                         String password,
                         Role role) { // <-- ajout du paramètre role

        // Vérifier si l'email existe déjà
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        // Créer l'utilisateur
        User user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // Rôle (par défaut STUDENT si null)
        user.setRole(role != null ? role : Role.STUDENT);

        return userRepository.save(user);
    }



    public boolean login(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        return passwordEncoder.matches(password, user.getPassword());
    }

    public User authenticate(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthException("Email ou mot de passe incorrect");
        }

        return user;
    }


    public User createAdmin(String nom, String prenom, String email, String password) {
        User user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.ADMIN); // rôle ADMIN
        return userRepository.save(user);
    }
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }



}