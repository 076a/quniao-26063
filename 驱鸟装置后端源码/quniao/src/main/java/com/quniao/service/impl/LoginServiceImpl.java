package com.quniao.service.impl;


import com.quniao.constant.MessageConstant;
import com.quniao.exception.AccountNotFoundException;
import com.quniao.exception.PasswordErrorException;
import com.quniao.mapper.UserMapper;
import com.quniao.pojo.dto.LoginDto;
import com.quniao.pojo.dto.RegisterDto;
import com.quniao.pojo.entity.User;
import com.quniao.service.LoginService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        //1、根据用户名查询数据库中的数据
        User user = userMapper.getByUsername(username);

        //2、处理各种异常情况（用户名不存在、密码不对、账号被锁定）
        if (user == null) {
            //账号不存在
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }
        //密码比对
        //进行md5加密处理
        password= DigestUtils.md5DigestAsHex(password.getBytes());
        if (!password.equals(user.getPassword())) {
            //密码错误
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }

        //3、返回实体对象
        return user;
    }

    @Override
    public void save(RegisterDto registerDto) {
        User user = new User();
        BeanUtils.copyProperties(registerDto,user);

        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setCreateTime(LocalDateTime.now());
        userMapper.insert(user);

    }
}
