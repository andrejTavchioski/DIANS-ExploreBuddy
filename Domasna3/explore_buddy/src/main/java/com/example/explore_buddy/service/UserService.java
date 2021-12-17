package com.example.explore_buddy.service;

import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.AppUser;
import com.example.explore_buddy.repository.IUserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService implements IUserService{

    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AppUser findUserByEmail(String email) {
        return null;
    }

    @Override
    public List<Location> getFavourites(String email) {
        return userRepository.findUserByEmail(email).getFavouriteLocations();
    }

    @Override
    @Transactional
    public void changeFavourite() {

    }
}
