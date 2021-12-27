package com.example.explore_buddy.service;

import com.example.explore_buddy.config.PasswordEncoder;
import com.example.explore_buddy.config.token.ConfirmationToken;
import com.example.explore_buddy.config.token.ConfirmationTokenService;
import com.example.explore_buddy.model.Location;
import com.example.explore_buddy.model.AppUser;
import com.example.explore_buddy.repository.IUserRepository;
import org.springframework.security.core.token.TokenService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements IUserService{

    private final IUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final ConfirmationTokenService tokenService;
    public UserService(IUserRepository userRepository, PasswordEncoder encoder, ConfirmationTokenService tokenService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.tokenService = tokenService;
    }

    @Override
    public AppUser findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<Location> getFavourites(String email) {
        return userRepository.findUserByEmail(email).getFavouriteLocations();
    }

    @Override
    @Transactional
    public void changeFavourite() {

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
