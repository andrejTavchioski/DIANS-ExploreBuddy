package com.explorebuddy.main;

import com.explorebuddy.main.config.RegistrationRequest;
import com.explorebuddy.main.config.RegistrationService;
import com.explorebuddy.main.models.AppUser;
import com.explorebuddy.main.models.DescriptionlessLocation;
import com.explorebuddy.main.models.Location;
import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

import static com.explorebuddy.main.MainApplication.getToken;

@RestController
@AllArgsConstructor
public class MainController {
    private final WebClient.Builder webClientBuilder;
    private final RegistrationService registrationService;
    @GetMapping("/home")
    public List<Location> getLocations() {
        return webClientBuilder.build()
                .get()
                .uri("http://LOCATION/home")
                .retrieve()
                .bodyToFlux(Location.class)
                .toStream().collect(Collectors.toList());
    }

    @PostMapping("/home/importCsv")
    public ResponseEntity<List<Location>> postLocations(@RequestParam("file") MultipartFile file) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource());
        List<Location> locations = webClientBuilder.build()
                .post()
                .uri("http://LOCATION/home/importCsv")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToFlux(Location.class).toStream().collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(locations);
    }

    @GetMapping("/home/markers")
    public List<DescriptionlessLocation> getMarkers(@RequestParam(required = false) String searchText,
                                                    @RequestParam(required =false) String locationTypeString,
                                                    @RequestParam(required = false) boolean isFavourite) {
        return webClientBuilder.build()
                .get()
                .uri("http://LOCATION/home/markers?searchText="+searchText+"&locationTypeString="+locationTypeString+
                        "&isFavourite="+isFavourite+"&emailForUserInSession="+getToken())
                .retrieve()
                .bodyToFlux(DescriptionlessLocation.class)
                .toStream().collect(Collectors.toList());
    }

    @GetMapping("/home/search")
    public List<Location> getByNameSearch(@RequestParam String name) {
        return webClientBuilder.build()
                .get()
                .uri("http://LOCATION/home/search?name=" + name)
                .retrieve()
                .bodyToFlux(Location.class)
                .toStream().collect(Collectors.toList());
    }

    @GetMapping("/home/getLocation")
    public Location getLocation(@RequestParam Long id) {
        return webClientBuilder.build()
                .get()
                .uri("http://LOCATION/home/getLocation?id="+id)
                .retrieve()
                .bodyToMono(Location.class).block();
    }

    @PostMapping("/home/add")
    public Location addLocation(@RequestBody Location location) {
        return webClientBuilder.build()
                .post()
                .uri("http://LOCATION/home/add")
                .body(Mono.just(location), Location.class)
                .retrieve()
                .bodyToMono(Location.class)
                .block();

    }

    @DeleteMapping("/home/{id}")
    public void deleteLocation(@PathVariable Long id) {
        webClientBuilder.build()
                .delete()
                .uri("http://LOCATION/home/"+id)
                .retrieve()
                .bodyToMono(void.class)
                .block();
    }

    @PutMapping("/home/update")
    public Location updateLocation(@RequestBody Location location) {
        return webClientBuilder.build()
                .put()
                .uri("http://LOCATION/home/update")
                .body(Mono.just(location), Location.class)
                .retrieve()
                .bodyToMono(Location.class)
                .block();
    }
    @GetMapping("user")
    public List<AppUser> getUsers() {
        return webClientBuilder.build()
                .get()
                .uri("http://APPUSER/user")
                .retrieve()
                .bodyToFlux(AppUser.class).toStream().collect(Collectors.toList());
    }

    @GetMapping("user/getUser")
    public AppUser getUser(@RequestParam String email) {
        return webClientBuilder.build()
                .get()
                .uri("http://APPUSER/user/getUser?email="+email)
                .retrieve()
                .bodyToMono(AppUser.class).block();

    }

    @GetMapping("user/favourites")
    public List<Long> getFavourites(@RequestParam String email) {
        return webClientBuilder.build()
                .get()
                .uri("http://APPUSER/user/favourites?email="+email)
                .retrieve()
                .bodyToFlux(Long.class).toStream().collect(Collectors.toList());
    }
    @PutMapping("user/setFavourite/{id}")
    public Boolean setFavourites(@RequestParam String email, @PathVariable Integer id) {
        return webClientBuilder.build()
                .put()
                .uri("http://APPUSER/user/favourites/"+id+"?email="+email)
                .retrieve()
                .bodyToMono(Boolean.class).block();
    }
    @PostMapping("user/registration")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
    @GetMapping("user/registration/confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);

    }
    @PostMapping("user/registration/admin")
    public String registerAdmin(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
}
