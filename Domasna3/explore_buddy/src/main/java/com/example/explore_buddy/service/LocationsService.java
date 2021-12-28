package com.example.explore_buddy.service;

import com.example.explore_buddy.helpers.CSVHelper;
import com.example.explore_buddy.model.DescriptionlessLocation;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.enumeration.LocationType;
import com.example.explore_buddy.repository.ILocationsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationsService implements ILocationsService {
    //    @Autowired
    private ILocationsRepository locationsRepository;

    public LocationsService(ILocationsRepository locationsRepository) {
        this.locationsRepository = locationsRepository;
    }

    @Override
    public List<Location> getAll() {
        return locationsRepository.findAll();
    }

    @Override
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
        return locationsRepository.save(location);
    }

    @Override
    public List<Location> getByName(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Missing name");
        return locationsRepository.findByName(name);
    }

    @Override
    public List<Location> getAllByType(String type) {
        if (type == null || type.isEmpty())
            throw new IllegalArgumentException("Missing type");
        return locationsRepository.findAllByType(LocationType.valueOf(type));
    }

    @Override
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
        return locationsRepository.save(location);
    }


    @Override
    public List<Location> getAllByNameSearch(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Missing name");
        return locationsRepository.findByNameContains(name);
    }

    public List<Location> importFromCsv(MultipartFile file) {
        try {
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().length() - 4);
            List<Location> locations = CSVHelper.csvToLocations(file.getInputStream(), name);
            locationsRepository.saveAll(locations);
            return locations;
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    @Override
    public Location getLocation(Integer id) {
        if (id == null)
            throw new IllegalArgumentException("Missing id");
        return locationsRepository.findById(id).orElse(null);
    }

    @Override
    public List<DescriptionlessLocation> getAllLocationMarkers() {
        return locationsRepository.findAll().stream()
                .map(location -> {
                    return new DescriptionlessLocation(location.getId(), location.getName(), location.getLon(), location.getLat(), location.getType());
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLocationById(Integer id) {
        if (id == null)
            throw new IllegalArgumentException("Missing id");
        locationsRepository.deleteById(id);
    }

}
