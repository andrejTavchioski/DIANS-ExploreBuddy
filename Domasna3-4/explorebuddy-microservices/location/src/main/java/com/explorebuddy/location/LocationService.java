package com.explorebuddy.location;

import com.explorebuddy.location.models.DescriptionlessLocation;
import com.explorebuddy.location.models.Location;
import com.explorebuddy.location.models.LocationType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final WebClient.Builder webClientBuilder;
    public List<Location> getAll() {
        return locationRepository.findAll();
    }

    public List<Location> importFromCsv(MultipartFile file) {
        try {
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().length() - 4);
            List<Location> locations = CSVHelper.csvToLocations(file.getInputStream(), name);
            locationRepository.saveAll(locations);
            return locations;
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public List<DescriptionlessLocation> getAllLocationMarkers() {
        return locationRepository.findAll().stream()
                .map(location -> {
                    return new DescriptionlessLocation(location.getId(), location.getName(), location.getLon(), location.getLat(), location.getType());
                })
                .collect(Collectors.toList());
    }

    public List<Location> getAllByNameSearch(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Missing name");
        return locationRepository.findByNameContains(name);
    }

    public Location getLocation(Long id) {
        return locationRepository.findById(id).orElseThrow(()->new IllegalStateException("invalid id"));
    }

    public Location post(Location location) {
        if (location.getName() == null || location.getName().isEmpty())
            throw new IllegalArgumentException("No name");
        if (location.getLon() == null)
            throw new IllegalArgumentException("Missing longitude");
        if (location.getLon().isNaN())
            throw new IllegalArgumentException("Invalid longitude");
        if (location.getLat() == null)
            throw new IllegalArgumentException("Missing latitude");
        if (location.getLat().isNaN())
            throw new IllegalArgumentException("Invalid latitude");
        if (location.getType() == null)
            throw new IllegalArgumentException("Missing type");
        return locationRepository.save(location);
    }

    public void deleteLocationById(Long id) {
        if (id == null)
            throw new IllegalArgumentException("Missing id");
        locationRepository.deleteById(id);
    }

    public Location updateLocation(Location location) {
        if (location.getId() == null)
            throw new IllegalArgumentException("Missing id");
        if (location.getName() == null || location.getName().isEmpty())
            throw new IllegalArgumentException("No name");
        if (location.getLon() == null)
            throw new IllegalArgumentException("Missing longitude");
        if (location.getLon().isNaN())
            throw new IllegalArgumentException("Invalid longitude");
        if (location.getLat() == null)
            throw new IllegalArgumentException("Missing latitude");
        if (location.getLat().isNaN())
            throw new IllegalArgumentException("Invalid latitude");
        if (location.getType() == null)
            throw new IllegalArgumentException("Missing type");
        return locationRepository.save(location);
    }

    public List<DescriptionlessLocation> getMarkers(String query, String[] types, boolean isFavourite,String email) {
        List<Location> locationsToReturn;
        if(query==null && types==null){
            locationsToReturn=locationRepository.findAll();
        }
        else if(query==null){
            List<LocationType> locationTypes=convertToTypeFromString(types);
            locationsToReturn=locationRepository.findLocationsByTypeIsIn(locationTypes);
        }
        else if(types==null){
            locationsToReturn=locationRepository.findLocationsByNameContainingIgnoreCase(query);
        }
        else{
            List<LocationType> locationTypes=convertToTypeFromString(types);
            locationsToReturn=locationRepository.findLocationsByTypeIsInAndNameContainingIgnoreCase(locationTypes,query);
        }
        if(isFavourite){
            String token = email;
            if(token!=null){
                //List<Location> favouriteLocations = userRepository.findUserByEmail(token).getFavouriteLocations();
                List<Long> favouriteLocationIds=webClientBuilder.build().get()
                        .uri("http://localhost:8081/user/favourites?email="+token)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
                List<Location> favouriteLocations=locationRepository.findAllById(favouriteLocationIds);
                return convertToDescriptionless(locationsToReturn.stream().filter(favouriteLocations::contains).collect(Collectors.toList()));
            }
        }
        return convertToDescriptionless(locationsToReturn);
    }
    public List<DescriptionlessLocation> convertToDescriptionless(List<Location> locations) {
        return locations.stream()
                .map(location -> {
                    return new DescriptionlessLocation(location.getId(), location.getName(), location.getLon(), location.getLat(), location.getType());
                })
                .collect(Collectors.toList());
    }
    public List<LocationType> convertToTypeFromString(String[] locationTypes) {
        return Arrays.stream(locationTypes).map(LocationType::valueOf).collect(Collectors.toList());
    }
}
