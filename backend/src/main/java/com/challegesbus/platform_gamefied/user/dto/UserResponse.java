package com.challegesbus.platform_gamefied.user.dto;

import java.time.LocalDate;
import java.util.UUID;

public class UserResponse {
    private String name;
    private LocalDate birthDay;
    private UUID id;

    public UserResponse(String name, LocalDate birthDay, UUID id){
        this.name = name;
        this.birthDay = birthDay;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public UUID getId() {
        return id;
    }
}
