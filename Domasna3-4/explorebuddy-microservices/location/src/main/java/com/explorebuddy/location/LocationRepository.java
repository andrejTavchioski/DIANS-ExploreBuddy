package com.explorebuddy.location;


import com.explorebuddy.location.models.Location;
import com.explorebuddy.location.models.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,Long> {
    List<Location> findByNameContains(String name);
    List<Location> findLocationsByTypeIsIn(List<LocationType> locationType);
    List<Location> findLocationsByNameContainingIgnoreCase(String query);
    List<Location> findLocationsByTypeIsInAndNameContainingIgnoreCase(List<LocationType> locationType,String query);
}
