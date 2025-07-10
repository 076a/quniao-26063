package com.quniao.pojo.vo;

import java.time.LocalDateTime;

public class UserInfoVo {
    private Integer id;
    private String username;
    private String roleName;
    private Integer fieldId;
    private String fieldName;
    private String phone;
    private String email;
    private Integer age;
    private LocalDateTime createTime;


    public UserInfoVo() {
    }

    public UserInfoVo(Integer id, String username, String roleName, Integer fieldId, String fieldName, String phone, String email, Integer age, LocalDateTime createTime) {
        this.id = id;
        this.username = username;
        this.roleName = roleName;
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.phone = phone;
        this.email = email;
        this.age = age;
        this.createTime = createTime;
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
     * @return roleName
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 设置
     * @param roleName
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
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
     * @return fieldName
     */
    public String getFieldName() {
        return fieldName;
    }

    /**
     * 设置
     * @param fieldName
     */
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
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

    public String toString() {
        return "UserInfoVo{id = " + id + ", username = " + username + ", roleName = " + roleName + ", fieldId = " + fieldId + ", fieldName = " + fieldName + ", phone = " + phone + ", email = " + email + ", age = " + age + ", createTime = " + createTime + "}";
    }
}
