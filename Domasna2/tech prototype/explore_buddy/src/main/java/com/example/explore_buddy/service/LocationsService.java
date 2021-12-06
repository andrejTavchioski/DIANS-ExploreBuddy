package com.example.explore_buddy.service;

import com.example.explore_buddy.helpers.CSVHelper;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.enumeration.LocationType;
import com.example.explore_buddy.repository.ILocationsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Override
    public List<Location> getByName(String name) {
        return locationsRepository.findByName(name);
    }

    @Override
    public List<Location> getAllByType(String type) {
        return locationsRepository.findAllByLocationType(LocationType.valueOf(type));
    }

    @Override
    public List<Location> getFavourites() {
        return locationsRepository.findByFavourite(true);
    }

    @Override
    public void updateLocation(Integer id) {
        Location toupdate=locationsRepository.findById(id).orElse(null);
        if(toupdate!=null)
        {
            if(toupdate.getFavourite())
                toupdate.setFavourite(false);
            else
                toupdate.setFavourite(true);
            locationsRepository.save(toupdate);
        }
    }

    @Override
    public List<Location> getAllByNameSearch(String name) {
        return locationsRepository.findByNameContains(name);
    }
    public List<Location> importFromCsv(MultipartFile file){
        try {
            String name=file.getOriginalFilename().substring(0,file.getOriginalFilename().length()-4);
            List<Location> locations = CSVHelper.csvToLocations(file.getInputStream(),name);
            locationsRepository.saveAll(locations);
            return locations;
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }
}
