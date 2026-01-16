package com.challegesbus.platform_gamefied.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.challegesbus.platform_gamefied.user.service.UserService;

import jakarta.validation.Valid;

import com.challegesbus.platform_gamefied.user.dto.UserResponse;
import com.challegesbus.platform_gamefied.user.dto.UserCreateRequest;

@RestController
@RequestMapping("/user")    
public class UserController {
    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserCreateRequest request){
        UserResponse response = service.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
