package com.challegesbus.platform_gamefied.user.service;

import com.challegesbus.platform_gamefied.common.exception.CpfAlreadyExistsException;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.challegesbus.platform_gamefied.user.dto.UserCreateRequest;
import com.challegesbus.platform_gamefied.user.dto.UserResponse;
import com.challegesbus.platform_gamefied.user.entity.User;
import com.challegesbus.platform_gamefied.user.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository){
        this.repository = repository;
    }

    @Transactional
    public UserResponse createUser(UserCreateRequest request){
        if(repository.existsByCpf(request.getCpf()))
            throw new CpfAlreadyExistsException();

        User user = new User(request.getCpf(), request.getName(), request.getBirthDay());

        User userSaved = repository.save(user);

        return new UserResponse(userSaved.getName(), userSaved.getBirthDay(), userSaved.getId());
    }
}
