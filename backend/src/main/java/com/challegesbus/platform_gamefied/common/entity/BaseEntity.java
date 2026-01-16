package com.challegesbus.platform_gamefied.common.entity;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseEntity {
    @Id
    protected UUID id;

    protected BaseEntity(){
        this.id = generateId();
    }

    protected UUID generateId(){
        return generateUUID();
    }

    protected UUID generateUUID(){
        UUID uuid = UUID.randomUUID();
        
        return uuid;
    }

    public UUID getId() {
        return id;
    }
}
