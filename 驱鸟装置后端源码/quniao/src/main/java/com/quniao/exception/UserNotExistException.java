package com.quniao.exception;

public class UserNotExistException extends BaseException{
    public UserNotExistException(String message) {
        super(message);
    }
    public UserNotExistException() {

    }
}
