package com.quniao.pojo.entity;

import com.alibaba.fastjson2.annotation.JSONField;

public class Pub {
    @JSONField(name = "TargetDevice")
    private String TargetDevice;
    private Integer horizon_angle;
    private Integer vertical_angle;


    public Pub() {
    }

    public Pub(String TargetDevice, Integer horizon_angle, Integer vertical_angle) {
        this.TargetDevice = TargetDevice;
        this.horizon_angle = horizon_angle;
        this.vertical_angle = vertical_angle;
    }

    /**
     * 获取
     * @return TargetDevice
     */
    public String getTargetDevice() {
        return TargetDevice;
    }

    /**
     * 设置
     * @param TargetDevice
     */
    public void setTargetDevice(String TargetDevice) {
        this.TargetDevice = TargetDevice;
    }

    /**
     * 获取
     * @return horizon_angle
     */
    public Integer getHorizon_angle() {
        return horizon_angle;
    }

    /**
     * 设置
     * @param horizon_angle
     */
    public void setHorizon_angle(Integer horizon_angle) {
        this.horizon_angle = horizon_angle;
    }

    /**
     * 获取
     * @return vertical_angle
     */
    public Integer getVertical_angle() {
        return vertical_angle;
    }

    /**
     * 设置
     * @param vertical_angle
     */
    public void setVertical_angle(Integer vertical_angle) {
        this.vertical_angle = vertical_angle;
    }

    public String toString() {
        return "Pub{TargetDevice = " + TargetDevice + ", horizon_angle = " + horizon_angle + ", vertical_angle = " + vertical_angle + "}";
    }
}
