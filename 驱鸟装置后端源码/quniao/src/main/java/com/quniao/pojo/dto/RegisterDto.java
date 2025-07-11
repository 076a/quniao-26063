package com.quniao.pojo.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password;
    private Integer role; //1是管理员，2是普通用户


}
