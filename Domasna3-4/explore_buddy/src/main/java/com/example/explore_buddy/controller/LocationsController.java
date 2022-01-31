package com.example.explore_buddy.controller;

import com.example.explore_buddy.helpers.CSVHelper;
import com.example.explore_buddy.model.DescriptionlessLocation;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.LocationFullInfo;
import com.example.explore_buddy.model.enumeration.LocationType;
import com.example.explore_buddy.service.ILocationsService;
import lombok.Getter;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping("/importCsv")
    public ResponseEntity<List<Location>> postLocations(@RequestParam("file") MultipartFile file){
        List<Location> locations=new ArrayList<>();
        if (CSVHelper.hasCSVFormat(file)) {
                locations=locationsService.importFromCsv(file);
        }
        return ResponseEntity.status(HttpStatus.OK).body(locations);

}

    @GetMapping("/markers")
    public List<DescriptionlessLocation> getMarkers(@RequestParam(required = false) String searchText,
                                                    @RequestParam(required =false) String locationTypeString,
                                                    @RequestParam(required = false) boolean isFavourite){
        String[] locationTypes=null;
        if(locationTypeString!=null)
        locationTypes=locationTypeString.split(",");
        return locationsService.getMarkers(searchText,locationTypes,isFavourite);
    }

    @GetMapping("/getLocation")
    public LocationFullInfo getLocation(@RequestParam Integer id){
        return locationsService.getLocation(id);
    }

    @PostMapping("/add")
    public Location addLocation(@RequestBody Location location){
        return locationsService.post(location);
    }
    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Integer id ){
        locationsService.deleteLocationById(id);
    }
    @PutMapping("/update")
    public Location updateLocation(@RequestBody Location location){
        return locationsService.updateLocation(location);
    }
}
