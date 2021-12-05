package com.example.explore_buddy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "location")
@Getter
@Setter
public class Location {
    @Id
    @SequenceGenerator(name = "location_sequence_generator", sequenceName = "location_sequence", allocationSize = 1, initialValue = 0)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_sequence")
    private Integer id;
    private String name;
    private Long lon;
    private Long lat;
    private String description;
    private LocationType locationType;
    private Boolean favourite;
    public Location(String name, Long lon, Long lat, String description, LocationType locationType){
        this.name=name;
        this.lon=lon;
        this.lat=lat;
        this.description=description;
        this.locationType=locationType;
        this.favourite=false;
    }
}
