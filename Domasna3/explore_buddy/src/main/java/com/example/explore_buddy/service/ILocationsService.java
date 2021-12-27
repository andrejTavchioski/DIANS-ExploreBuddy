package com.example.explore_buddy.service;

import com.example.explore_buddy.model.DescriptionlessLocation;
import com.example.explore_buddy.model.Location;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ILocationsService {
    List<Location> getAll();
    Location post(Location location);
    List<Location> getByName(String name);
    List<Location> getAllByType(String type);
//    List<Location> getFavourites();
    void updateLocation(Location location);
    List<Location> getAllByNameSearch(String name);
    List<Location> importFromCsv(MultipartFile file);
    Location getLocation(Integer id);
    List<DescriptionlessLocation> getAllLocationMarkers();
    void deleteLocationById(Integer id);
}
