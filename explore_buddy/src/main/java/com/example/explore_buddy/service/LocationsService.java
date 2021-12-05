package com.example.explore_buddy.service;

import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.repository.ILocationsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationsService implements ILocationsService {
//    @Autowired
    private ILocationsRepository locationsRepository;
    public LocationsService(ILocationsRepository locationsRepository){
        this.locationsRepository=locationsRepository;
    }
    @Override
    public List<Location> getAll() {
        return locationsRepository.findAll();
    }

    @Override
    public void post(Location location) {
        locationsRepository.save(location);
    }

}
