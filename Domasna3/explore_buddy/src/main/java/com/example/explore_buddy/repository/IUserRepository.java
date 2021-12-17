package com.example.explore_buddy.repository;

import com.example.explore_buddy.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<AppUser, String> {
    AppUser findUserByEmail(String email);

}
