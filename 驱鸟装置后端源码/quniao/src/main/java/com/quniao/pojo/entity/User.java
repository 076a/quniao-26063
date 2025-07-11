package com.quniao.pojo.entity;
import java.time.LocalDateTime;

public class User {
    private Integer id;
    private String username;
    private String password;
    private Integer role;
    private Integer fieldId;
    private LocalDateTime createTime;
    private Integer age;
    private String phone;
    private String email;


    public User() {
    }

    public User(Integer id, String username, String password, Integer role, Integer fieldId, LocalDateTime createTime, Integer age, String phone, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.fieldId = fieldId;
        this.createTime = createTime;
        this.age = age;
        this.phone = phone;
        this.email = email;
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
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取
     * @return role
     */
    public Integer getRole() {
        return role;
    }

    /**
     * 设置
     * @param role
     */
    public void setRole(Integer role) {
        this.role = role;
    }

    /**
     * 获取
     * @return fieldId
     */
    public Integer getFieldId() {
        return fieldId;
    }

    /**
     * 设置
     * @param fieldId
     */
    public void setFieldId(Integer fieldId) {
        this.fieldId = fieldId;
    }

    /**
     * 获取
     * @return createTime
     */
    public LocalDateTime getCreateTime() {
        return createTime;
    }

    /**
     * 设置
     * @param createTime
     */
    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取
     * @return age
     */
    public Integer getAge() {
        return age;
    }

    /**
     * 设置
     * @param age
     */
    public void setAge(Integer age) {
        this.age = age;
    }

    /**
     * 获取
     * @return phone
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置
     * @param phone
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 获取
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return "User{id = " + id + ", username = " + username + ", password = " + password + ", role = " + role + ", fieldId = " + fieldId + ", createTime = " + createTime + ", age = " + age + ", phone = " + phone + ", email = " + email + "}";
    }
}
