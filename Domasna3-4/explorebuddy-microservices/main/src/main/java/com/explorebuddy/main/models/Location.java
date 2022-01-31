package com.explorebuddy.main.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
public class Location {
    private Long id;
    private String name;
    private Double lon;
    private Double lat;
    private String description;
    private LocationType type;

    public Location(String name, Double lon, Double lat, String description, LocationType type) {
        this.name = name;
        this.lon = lon;
        this.lat = lat;
        this.description = description;
        this.type = type;
    }
}
