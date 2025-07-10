package com.quniao.pojo.vo;


public class LoginVo {
    private Integer id;
    private String username;
    private String token;


    public LoginVo() {
    }

    public LoginVo(Integer id, String username, String token) {
        this.id = id;
        this.username = username;
        this.token = token;
    }

    /**
     * 获取
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * 设置
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * 获取
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    public String toString() {
        return "LoginVo{id = " + id + ", username = " + username + ", token = " + token + "}";
    }
}
