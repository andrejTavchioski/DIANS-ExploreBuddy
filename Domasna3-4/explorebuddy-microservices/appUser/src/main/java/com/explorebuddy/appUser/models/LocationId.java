package com.explorebuddy.appUser.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LocationId {
    @Id
    private Long id;
    @ManyToMany(mappedBy = "favouritesIds")
    private List<AppUser> appUser;

    public LocationId(Long id) {
        this.id = id;
    }
}
