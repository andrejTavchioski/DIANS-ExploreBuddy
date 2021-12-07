package com.example.explore_buddy.model;

import com.example.explore_buddy.model.enumeration.LocationType;
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
    private Double lon;
    private Double lat;
    private String desc;
    private LocationType type;
    public Location(String name, Double lon, Double lat, String description, LocationType locationType){
        this.name=name;
        this.lon=lon;
        this.lat=lat;
        this.desc=description;
        this.type=locationType;
    }
}
