package com.example.explore_buddy.repository;

import com.example.explore_buddy.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILocationsRepository extends JpaRepository<Location,Integer> {
}
