package com.explorebuddy.appUser;

import com.explorebuddy.appUser.models.AppUser;
import com.explorebuddy.appUser.token.ConfirmationToken;
import com.explorebuddy.appUser.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    @GetMapping
    public List<AppUser> getUsers() {
        System.out.println("get users");
        return userService.findAll();
    }
    @GetMapping("/getByEmail")
    public AppUser getUserByEmail(@RequestParam String email){
        return userService.findUserByEmail(email);
    }
    @GetMapping("/getUser")
    public AppUser getUser(@RequestParam String email) {
        System.out.println("get user with email " + email);
        return userService.findUserByEmail(email);
    }

    @GetMapping("/favourites")
    public List<Long> getFavourites(@RequestParam String email) {
        System.out.println("get favsss za mejl ="+email);
        return userService.getFavourites(email);
    }
    @PutMapping("/setFavourite/{id}")
    public Boolean setFavourites(@RequestParam String email, @PathVariable Integer id) {
        System.out.println("set favss id="+id + "  email ="+email);
        return userService.changeFavourite(id, email);
    }
    @PostMapping("/updateLocationIds")
    public void updateIds(@RequestBody List<Long> ids){
        System.out.println("update ids");
        userService.updateIds(ids);
    }
    @PostMapping("/save")
    public void saveUser(@RequestBody AppUser user){
        userService.save(user);
    }
    @GetMapping("/enable")
    public void enableUser(@RequestParam String email){
        userService.enableUser(email);
    }
    //save get set token
    @PostMapping("/saveConfirmationToken")
    public void saveToken(@RequestBody ConfirmationToken token){
        confirmationTokenService.saveConfirmationToken(token);
    }
    @GetMapping("/getConfirmationToken")
    public ConfirmationToken getToken(@RequestParam String token){
        return confirmationTokenService.getToken(token).orElse(null);
    }
    @GetMapping("/setConfirmedToken")
    public int setConfirmed(@RequestParam String token){
        return confirmationTokenService.setConfirmedAt(token);
    }

}
