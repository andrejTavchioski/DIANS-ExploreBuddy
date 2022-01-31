package com.explorebuddy.appUser;

import com.explorebuddy.appUser.models.AppUser;
import com.explorebuddy.appUser.models.LocationId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final LocationIdRepository locationIdRepository;
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

    public AppUser findUserByEmail(String email) {
        return userRepository.findAppUserByEmail(email).orElse(null);
    }

    public List<Long> getFavourites(String email) {
        AppUser user=userRepository.findAppUserByEmail(email).orElseThrow(() -> new IllegalStateException("email doesnt exist"));
        List<Long> ids= user.getFavouritesIds().stream().map(LocationId::getId).collect(Collectors.toList());
        return ids;
    }

    public Boolean changeFavourite(Integer id, String email) {
        LocationId locationId=new LocationId(Long.valueOf(id));
        AppUser user = userRepository.findAppUserByEmail(email).orElseThrow(()->new IllegalStateException("user not found"));
        if (user.getFavouritesIds().contains(locationId)) {
            user.getFavouritesIds().remove(locationId);
            return false;
        } else {
            user.getFavouritesIds().add(locationId);
            return true;
        }
    }

    public void updateIds(List<Long> ids){
        List<LocationId> locationIds=ids.stream().map(LocationId::new).collect(Collectors.toList());
        locationIdRepository.saveAll(locationIds);
    }

    public void save(AppUser user) {
        userRepository.save(user);
    }

    public void enableUser(String email) {
        userRepository.enableUser(email);
    }
}
