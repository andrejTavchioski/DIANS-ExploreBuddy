package com.explorebuddy.location;

import com.explorebuddy.location.models.DescriptionlessLocation;
import com.explorebuddy.location.models.Location;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/home")
@AllArgsConstructor
public class LocationController {
    private final LocationService locationsService;
    private final WebClient.Builder webClientBuilder;

    @GetMapping
    public List<Location> getLocations() {
        return locationsService.getAll();
    }

    @PostMapping("/importCsv")
    public List<Location> postLocations(@RequestParam("file") MultipartFile file) {
        List<Location> locations=new ArrayList<>();
        if (CSVHelper.hasCSVFormat(file)) {
            locations=locationsService.importFromCsv(file);
        }
        webClientBuilder.build()
                .post()
                .uri("http://localhost:8081/user/updateLocationIds")
                .body(Flux.fromIterable(locations.stream().map(Location::getId).collect(Collectors.toList())), Long.class)
                .retrieve().bodyToMono(void.class).block();
        return locations;
    }

    @GetMapping("/markers")
    public List<DescriptionlessLocation> getMarkers(@RequestParam(required = false) String searchText,
                                                    @RequestParam(required =false) String locationTypeString,
                                                    @RequestParam(required = false) boolean isFavourite,
                                                    @RequestParam(required = false) String emailForUserInSession){
        String[] locationTypes=null;
        if(locationTypeString!=null)
            locationTypes=locationTypeString.split(",");
        return locationsService.getMarkers(searchText,locationTypes,isFavourite,emailForUserInSession);
    }
//    @GetMapping("/location_type")
//    public List<Location> getByLocationType(@RequestParam String type){
//        return locationsService.getAllByType(type);
//    }

//    @GetMapping("/add_favourite")
//    public void addFavourite(Integer id){
//        locationsService.updateLocation(id);
//    }

    @GetMapping("/search")
    public List<Location> getByNameSearch(@RequestParam String name) {
        return locationsService.getAllByNameSearch(name);
    }

    @GetMapping("/getLocation")
    public Location getLocation(@RequestParam Long id) {
        return locationsService.getLocation(id);
    }

    @PostMapping("/add")
    public Location addLocation(@RequestBody Location location) {
        Location loc = locationsService.post(location);
        webClientBuilder.build()
                .post()
                .uri("http://localhost:8081/user/updateLocationIds")
                .body(Flux.fromIterable(locationsService.getAll().stream().map(Location::getId).collect(Collectors.toList())), Long.class)
                .retrieve().bodyToMono(void.class).block();
        return loc;
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationsService.deleteLocationById(id);
        webClientBuilder.build()
                .post()
                .uri("http://localhost:8081/user/updateLocationIds")
                .body(Flux.fromIterable(locationsService.getAll().stream().map(Location::getId).collect(Collectors.toList())), Long.class)
                .retrieve().bodyToMono(void.class).block();
    }

    @PutMapping("/update")
    public Location updateLocation(@RequestBody Location location) {
        Location loc = locationsService.updateLocation(location);
        webClientBuilder.build()
                .post()
                .uri("http://localhost:8081/user/updateLocationIds")
                .body(Flux.fromIterable(locationsService.getAll().stream().map(Location::getId).collect(Collectors.toList())), Long.class)
                .retrieve().bodyToMono(void.class).block();
        return loc;
    }
}
