package com.explorebuddy.main.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LocationId {
    private Long id;
    private List<AppUser> appUser;

    public LocationId(Long id) {
        this.id = id;
    }
}
