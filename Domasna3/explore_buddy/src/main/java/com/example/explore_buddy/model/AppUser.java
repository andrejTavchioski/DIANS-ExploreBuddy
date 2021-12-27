package com.example.explore_buddy.model;

import com.example.explore_buddy.model.enumeration.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
public class AppUser implements UserDetails {
    @Id
    private String email;
    private String password;
    @ManyToMany
    private List<Location> favouriteLocations;
    private boolean locked;
    private boolean enabled;
    @Enumerated
    private UserType userType;
    public AppUser(String email, String password){
        this.email=email;
        this.password=password;
        this.userType=UserType.USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}