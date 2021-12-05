package com.example.explore_buddy.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "location")
public class Location {
    @Id
    @SequenceGenerator(name = "location_sequence_generator", sequenceName = "location_sequence", allocationSize = 1, initialValue = 0)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_sequence_generator")
    private Integer id;
    private String name;
    private Long lon;
    private Long lat;
    public Location(String name, Long lon, Long lat){
        this.name=name;
        this.lon=lon;
        this.lat=lat;
    }
}
