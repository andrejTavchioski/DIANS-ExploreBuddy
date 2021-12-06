package com.example.explore_buddy.repository;

import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ILocationsRepository extends JpaRepository<Location,Integer> {
    List<Location> findByName(String name);
    List<Location> findAllByLocationType(LocationType locationType);
    List<Location> findByFavourite(Boolean favourite);
    List<Location> findLocationsByNameContains(String name);
}
