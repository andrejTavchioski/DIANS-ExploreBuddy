package com.example.explore_buddy.controller;

import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.service.ILocationsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
public class LocationsController {
    private final ILocationsService locationsService;
    public LocationsController(ILocationsService locationsService){
        this.locationsService=locationsService;
    }
    @GetMapping
    public List<Location> getLocations(){
        return locationsService.getAll();
    }
    @PostMapping
    public void postLocation(@RequestBody Location location){
        locationsService.post(location);
    }

    @GetMapping("/favourites")
    public List<Location> getFavourites(){
        return locationsService.getFavourites();
    }

    @GetMapping("/by_name")
    public List<Location> getByName(@RequestBody String name){
        return locationsService.getByName(name);
    }

    @GetMapping("/location_type")
    public List<Location> getByLocationType(@RequestBody String type){
        return locationsService.getAllByType(type);
    }

    @PostMapping("/add_favourite")
    public void addFavourite(Location location){
        locationsService.post(location);
    }
}
