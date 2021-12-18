package com.example.explore_buddy.config.email;


import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {
        return s.contains("@") && s.split("@").length == 2;
    }
}
