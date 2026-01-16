package com.challegesbus.platform_gamefied.common.exception;

public abstract class DomainException extends RuntimeException{

    protected DomainException(String message){
        super(message);
    }
}
