package com.explorebuddy.location.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class Location {
    @Id
    @SequenceGenerator(name = "location_sequence_generator", sequenceName = "location_sequence", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_sequence_generator")
    private Long id;
    private String name;
    private Double lon;
    private Double lat;
    private String description;
    @Enumerated(value = EnumType.STRING)
    private LocationType type;

    public Location(String name, Double lon, Double lat, String description, LocationType type) {
        this.name = name;
        this.lon = lon;
        this.lat = lat;
        this.description = description;
        this.type = type;
    }
}
