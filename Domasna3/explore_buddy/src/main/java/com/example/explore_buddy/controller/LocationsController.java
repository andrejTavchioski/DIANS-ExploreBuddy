package com.example.explore_buddy.controller;

import com.example.explore_buddy.helpers.CSVHelper;
import com.example.explore_buddy.model.DescriptionlessLocation;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.service.ILocationsService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    @PostMapping("/importCsv")
    public ResponseEntity<List<Location>> postLocations(@RequestParam("file") MultipartFile file){
        String message = "";
        List<Location> locations=new ArrayList<>();
        if (CSVHelper.hasCSVFormat(file)) {
            try {
                //
                locations=locationsService.importFromCsv(file);
                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                //return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));

            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                //return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }

        }
        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.OK).body(locations);
        //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));

}

    @GetMapping("/favourites")
    public List<Location> getFavourites(){
        return locationsService.getFavourites();
    }
    @GetMapping("/markers")
    public List<DescriptionlessLocation> getMarkers(){return locationsService.getAllLocationMarkers();}
    @GetMapping("/location_type")
    public List<Location> getByLocationType(@RequestParam String type){
        return locationsService.getAllByType(type);
    }

//    @GetMapping("/add_favourite")
//    public void addFavourite(Integer id){
//        locationsService.updateLocation(id);
//    }

    @GetMapping("/search")
    public List<Location> getByNameSearch(@RequestParam String name){
        return locationsService.getAllByNameSearch(name);
    }
    @GetMapping("/getLocation")
    public Location getLocation(@RequestParam Integer id){
        return locationsService.getLocation(id);
    }

    @PostMapping("/add")
    public void addLocation(@RequestBody Location location){
        locationsService.post(location);
    }
}
