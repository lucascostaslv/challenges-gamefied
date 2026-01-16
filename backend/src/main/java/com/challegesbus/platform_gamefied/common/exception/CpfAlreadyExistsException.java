package com.challegesbus.platform_gamefied.common.exception;

public class CpfAlreadyExistsException extends DomainException{

    public CpfAlreadyExistsException(){
        super("CPF já cadastrado.");
    }
}
