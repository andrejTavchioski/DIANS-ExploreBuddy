package com.example.explore_buddy.service;

import com.example.explore_buddy.config.PasswordEncoder;
import com.example.explore_buddy.config.token.ConfirmationToken;
import com.example.explore_buddy.config.token.ConfirmationTokenRepository;
import com.example.explore_buddy.config.token.ConfirmationTokenService;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.AppUser;
import com.example.explore_buddy.repository.ILocationsRepository;
import com.example.explore_buddy.repository.IUserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService{

    private final IUserRepository userRepository;
    private final ILocationsRepository locationsRepository;
    private final ConfirmationTokenService tokenService;
    private final PasswordEncoder encoder;

    public UserService(IUserRepository userRepository, ILocationsRepository locationsRepository,ConfirmationTokenService tokenService, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.locationsRepository = locationsRepository;
        this.tokenService = tokenService;
        this.encoder = encoder;
    }

    @Override
    public AppUser findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<Integer> getFavourites(String email) {
        return userRepository.findUserByEmail(email).getFavouriteLocations().stream().map(Location::getId).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void changeFavourite(Integer id,String email) {
        Location location = locationsRepository.getById(id);
        AppUser user = userRepository.findUserByEmail(email);
        user.getFavouriteLocations().add(location);
    }

    public String signUpUser(AppUser appUser) {
        AppUser user = userRepository.findUserByEmail(appUser.getEmail());
        if(user!=null){
            throw new IllegalStateException("UserAlreadyExists");
        }
        String encodedPass = encoder.bCryptPasswordEncoder().encode(appUser.getPassword());
        appUser.setPassword(encodedPass);
        userRepository.save(appUser);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );
        tokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    @Override
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

    public int enableUser(String email){
        return  userRepository.enableUser(email);
    }

}
