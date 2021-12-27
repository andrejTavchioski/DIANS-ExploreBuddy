package com.example.explore_buddy.controller;

import com.example.explore_buddy.config.RegistrationRequest;
import com.example.explore_buddy.config.RegistrationService;
import com.example.explore_buddy.model.AppUser;
import com.example.explore_buddy.model.Location;
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

    public UserController(IUserService userService, RegistrationService registrationService) {
        this.userService = userService;
        this.registrationService = registrationService;
    }

    @GetMapping
    public List<AppUser> getUsers(){
        return userService.findAll();
    }
    @GetMapping("/getUser")
    public AppUser getUser(@RequestParam String email){
        return userService.findUserByEmail(email);
    }
    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
    @GetMapping("/registration/confirm")
    public String confirm(@RequestParam("token") String token, HttpServletResponse resp) throws IOException {
        resp.sendRedirect("/home");
        return registrationService.confirmToken(token);
    }
    @GetMapping("/favourites")
    public List<Integer> getFavourites(@RequestParam String email){
        return userService.getFavourites(email);
    }
    @PutMapping("/setFavourite/{id}")
    public void setFavourites(@RequestParam String email,@PathVariable Integer id){
        userService.changeFavourite(id,email);
    }



}
