package com.example.explore_buddy.service;

import com.example.explore_buddy.model.Location;

import java.util.List;

public interface ILocationsService {
    List<Location> getAll();
    void post(Location location);
    List<Location> getByName(String name);
    List<Location> getAllByType(String type);
    List<Location> getFavourites();
    void updateLocation(Integer id);
    List<Location> getAllByNameSearch(String name);
}
