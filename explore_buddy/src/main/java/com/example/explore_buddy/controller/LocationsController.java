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

    @GetMapping("/location_type")
    public List<Location> getByLocationType(@RequestParam String type){
        return locationsService.getAllByType(type);
    }

    @GetMapping("/add_favourite")
    public void addFavourite(Integer id){
        locationsService.updateLocation(id);
    }

    @GetMapping("/search")
    public List<Location> getByNameSearch(@RequestParam String name){
        return locationsService.getAllByNameSearch(name);
    }

    @PostMapping("/add")
    public void addLocation(@RequestBody Location location){
        locationsService.post(location);
    }
}
