package com.explorebuddy.main.config;

import com.explorebuddy.main.models.UserRole;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class RegistrationRequest {

    private  String email;
    private  String password;
    private UserRole role;

    public RegistrationRequest(String email, String password, UserRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }



    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public UserRole getRole() {
        return role;
    }
}