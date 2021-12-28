package com.example.explore_buddy.service;

import com.example.explore_buddy.config.PasswordEncoder;
import com.example.explore_buddy.config.email.EmailValidator;
import com.example.explore_buddy.config.token.ConfirmationToken;
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
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final ILocationsRepository locationsRepository;
    private final ConfirmationTokenService tokenService;
    private final PasswordEncoder encoder;
    private final EmailValidator emailValidator;
    public UserService(IUserRepository userRepository, ILocationsRepository locationsRepository, ConfirmationTokenService tokenService, PasswordEncoder encoder, EmailValidator emailValidator){
        this.userRepository = userRepository;
        this.locationsRepository = locationsRepository;
        this.tokenService = tokenService;
        this.encoder = encoder;
        this.emailValidator = emailValidator;
    }

    @Override
    public AppUser findUserByEmail(String email) {

        if (email == null || email.isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(email))
            throw new IllegalArgumentException("Invalid email");
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<Integer> getFavourites(String email) {
        if (email == null || email.isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(email))
            throw new IllegalArgumentException("Invalid email");
        return userRepository.findUserByEmail(email).getFavouriteLocations().stream().map(Location::getId).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean changeFavourite(Integer id, String email) {
        if (email == null || email.isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(email))
            throw new IllegalArgumentException("Invalid email");
        Location location = locationsRepository.getById(id);
        AppUser user = userRepository.findUserByEmail(email);
        if (user.getFavouriteLocations().contains(location)) {
            user.getFavouriteLocations().remove(location);
            return false;
        } else {
            user.getFavouriteLocations().add(location);
            return true;
        }
    }

    public String signUpUser(AppUser appUser) {
        if (appUser.getEmail() == null || appUser.getEmail().isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(appUser.getEmail()))
            throw new IllegalArgumentException("Invalid email");
        AppUser user = userRepository.findUserByEmail(appUser.getEmail());
        if (user != null) {
            throw new IllegalStateException("UserAlreadyExists");
        }
        if (appUser.getPassword() == null || appUser.getPassword().isEmpty())
            throw new IllegalArgumentException("Password is empty");
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

    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

}
