package com.example.explore_buddy.controller;

import com.example.explore_buddy.config.LoginRequest;
import com.example.explore_buddy.config.LoginService;
import com.example.explore_buddy.config.RegistrationRequest;
import com.example.explore_buddy.config.RegistrationService;
import com.example.explore_buddy.config.token.ConfirmationTokenService;
import com.example.explore_buddy.model.AppUser;
import com.example.explore_buddy.service.IUserService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final IUserService userService;
    private final RegistrationService registrationService;
    private final LoginService loginService;
    private final ConfirmationTokenService confirmationTokenService;
    public UserController(IUserService userService, RegistrationService registrationService, LoginService loginService, ConfirmationTokenService confirmationTokenService) {
        this.userService = userService;
        this.registrationService = registrationService;
        this.loginService = loginService;
        this.confirmationTokenService = confirmationTokenService;
    }

    @GetMapping
    public List<AppUser> getUsers() {
        return userService.findAll();
    }

    @GetMapping("/getUser")
    public AppUser getUser(@RequestParam String email) {
        return userService.findUserByEmail(email);
    }

    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping("/registration/confirm")
    public String confirm(@RequestParam("token") String token, HttpServletResponse resp) throws IOException {
        resp.sendRedirect("/home");
        return registrationService.confirmToken(token);

    }
    @PostMapping("/admin/registration")
    public String registerAdmin(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
    @PostMapping("/login")
    public AppUser loginUser(@RequestBody LoginRequest request){
        return loginService.login(request);
    }

    @GetMapping("/favourites")
    public List<Integer> getFavourites(@RequestParam String email) {
        return userService.getFavourites(email);
    }

    @PutMapping("/setFavourite/{id}")
    public void setFavourites(@RequestParam String email, @PathVariable Integer id) {
        userService.changeFavourite(id, email);
    }


}
