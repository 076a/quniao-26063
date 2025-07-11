package com.quniao.service;


import com.quniao.pojo.dto.LoginDto;
import com.quniao.pojo.dto.RegisterDto;
import com.quniao.pojo.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    User login(LoginDto loginDto);

    void save(RegisterDto registerDto);
}
