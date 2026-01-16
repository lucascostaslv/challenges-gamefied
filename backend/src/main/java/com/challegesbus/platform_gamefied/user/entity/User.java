package com.challegesbus.platform_gamefied.user.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import com.challegesbus.platform_gamefied.common.entity.BaseEntity;

@Entity
public class User extends BaseEntity{
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private LocalDate birthDay;

    public User(String cpf, String name, LocalDate bithDay){
        this.cpf = cpf;
        this.name = name;
        this.birthDay = bithDay;
    }

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
