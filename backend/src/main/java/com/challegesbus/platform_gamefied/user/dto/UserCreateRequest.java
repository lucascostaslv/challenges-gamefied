package com.challegesbus.platform_gamefied.user.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserCreateRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String cpf;

    @NotNull
    private LocalDate birthDay;

    public String getName() {
        return name;
    }

    public String getCpf() {
        return cpf;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }
}
