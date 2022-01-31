package com.explorebuddy.main.config;

import com.explorebuddy.main.config.email.EmailValidator;
import com.explorebuddy.main.config.token.ConfirmationToken;
import com.explorebuddy.main.models.AppUser;
import com.explorebuddy.main.models.Location;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final WebClient.Builder webClientBuilder;
    private final PasswordEncoder passwordEncoder;
    private final EmailValidator emailValidator;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return webClientBuilder.build().get().uri("http://APPUSER/user/getByEmail?email="+username)
                .retrieve().bodyToMono(UserDetails.class).block();
    }

    public String signUpUser(AppUser appUser) {
        if (appUser.getEmail() == null || appUser.getEmail().isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(appUser.getEmail()))
            throw new IllegalArgumentException("Invalid email");
        AppUser user = webClientBuilder.build().get().uri("http://APPUSER/user/getByEmail?email="+appUser.getEmail())
                .retrieve().bodyToMono(AppUser.class).block();
        if (user != null) {
            throw new IllegalStateException("UserAlreadyExists");
        }
        if (appUser.getPassword() == null || appUser.getPassword().isEmpty())
            throw new IllegalArgumentException("Password is empty");
        String encodedPass = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPass);
        webClientBuilder.build().post().uri("http://APPUSER/user/save")
                .body(Mono.just(appUser),AppUser.class)
                .retrieve()
                .bodyToMono(Location.class)
                .block();
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );
        webClientBuilder.build()
                .post().uri("http://APPUSER/saveConfirmationToken")
                .body(Mono.just(confirmationToken),ConfirmationToken.class)
                .retrieve().bodyToMono(void.class).block();
        //tokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    public void enableUser(String email) {
        webClientBuilder.build().get().uri("http://APPUSER/user/enable?email="+email)
                .retrieve().bodyToMono(UserDetails.class).block();
    }
}
