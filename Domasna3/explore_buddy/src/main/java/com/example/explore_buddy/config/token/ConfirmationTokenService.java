package com.example.explore_buddy.config.token;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepositoryRP confirmationTokenRepositoryRP;
    private final ConfirmationTokenRepositoryW confirmationTokenRepositoryW;


    public ConfirmationTokenService(ConfirmationTokenRepositoryRP confirmationTokenRepositoryRP, ConfirmationTokenRepositoryW confirmationTokenRepositoryW, parkup.configs.token.ConfirmationTokenRepositoryW confirmationTokenRepositoryW1) {
        this.confirmationTokenRepositoryRP = confirmationTokenRepositoryRP;
        this.confirmationTokenRepositoryW = confirmationTokenRepositoryW1;
    }
    public void saveConfirmationTokenRP(ConfirmationTokenRP token){
        confirmationTokenRepositoryRP.save(token);
    }

    public void saveConfirmationTokenW(ConfirmationTokenW token){
        confirmationTokenRepositoryW.save(token);}

    public Optional<ConfirmationTokenRP> getTokenRP(String token) {
        return confirmationTokenRepositoryRP.findByToken(token);
    }
    public Optional<ConfirmationTokenW> getTokenW(String token){
        return confirmationTokenRepositoryW.findByToken(token);
    }

    public void deleteByVraboten_VrabotenId(int vraboten_id){
        confirmationTokenRepositoryW.deleteByVraboten_VrabotenId(vraboten_id);
    }

    public void deleteByRegistriranParkirac_RegParkId(int regParkId){
        confirmationTokenRepositoryRP.deleteByRegistriranParkirac_RegParkId(regParkId);
    }

    public int setConfirmedAtRP(String token) {
        return confirmationTokenRepositoryRP.updateConfirmedAt(token, LocalDateTime.now());
    }
    public int setConfirmedAtW(String token){
        return confirmationTokenRepositoryW.updateConfirmedAt(token,LocalDateTime.now());
    }
}