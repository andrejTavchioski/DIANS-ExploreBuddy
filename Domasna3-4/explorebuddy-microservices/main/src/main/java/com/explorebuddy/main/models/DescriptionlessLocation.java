package com.explorebuddy.main.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DescriptionlessLocation {
    private Long id;
    private String name;
    private Double lon;
    private Double lat;
    private LocationType type;
    public DescriptionlessLocation(Long id, String name, Double lon, Double lat, LocationType type){
        this.id=id;
        this.name=name;
        this.lon=lon;
        this.lat=lat;
        this.type=type;
    }
}
