package ch.branassist.controller;

import ch.branassist.model.User;
import ch.branassist.model.UserProfileResponse;
import ch.branassist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ch.branassist.model.AuthResponse;
import ch.branassist.service.JwtService;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;  // Für JWT Token Erstellung

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Registrierung
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Passwort verschlüsseln
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // JWT Token erstellen
            String token = JwtService.generateToken(existingUser.getEmail());
            AuthResponse authResponse = new AuthResponse(token);
            return ResponseEntity.ok(authResponse);
            // Rückgabe des JWT Tokens
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid credentials"));
        }
    }

    // Aktuellen Benutzer abrufen
    @GetMapping("/current")
    public ResponseEntity<UserProfileResponse> getCurrentUser(Principal principal) {
        if (principal != null) {
            User user = userService.findByEmail(principal.getName());
            UserProfileResponse response = new UserProfileResponse(
                    user.getUserName(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName()
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
