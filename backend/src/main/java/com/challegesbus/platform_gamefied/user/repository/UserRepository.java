package com.challegesbus.platform_gamefied.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.challegesbus.platform_gamefied.user.entity.User;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>{
    boolean existsByCpf(String cpf);
}
