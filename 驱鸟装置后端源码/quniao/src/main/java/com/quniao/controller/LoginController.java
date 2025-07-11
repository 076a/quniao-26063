package com.quniao.controller;


import com.quniao.pojo.dto.LoginDto;
import com.quniao.pojo.dto.RegisterDto;
import com.quniao.pojo.entity.User;
import com.quniao.pojo.result.Result;
import com.quniao.pojo.vo.LoginVo;
import com.quniao.service.LoginService;
import com.quniao.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService loginService;

    //登录接口
    @PostMapping("/login")
    public Result login(@RequestBody LoginDto loginDto){
        //调用登录服务
        User u = loginService.login(loginDto);

        Map<String,Object> claims=new HashMap<>();
        claims.put("userId",u.getId());
        claims.put("username",u.getUsername());
        String jwt = JwtUtil.generateJwt(claims);//获取jwt令牌，jwt包含了当前用户的信息

        LoginVo loginVo = new LoginVo();
        loginVo.setToken(jwt);
        loginVo.setUsername(u.getUsername());
        loginVo.setId(u.getId());

        return Result.success(loginVo);

    }

    //注册接口
    @PostMapping("/register")
    public Result register(@RequestBody RegisterDto registerDto){
        loginService.save(registerDto);
        return Result.success("注册成功");
    }
}
