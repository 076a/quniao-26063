package com.quniao.pojo.dto;

public class PubDto {
    private String target_device;
    private Integer horizon_angle;
    private Integer vertical_angle;


    public PubDto() {
    }

    public PubDto(String target_device, Integer horizon_angle, Integer vertical_angle) {
        this.target_device = target_device;
        this.horizon_angle = horizon_angle;
        this.vertical_angle = vertical_angle;
    }

    /**
     * 获取
     * @return target_device
     */
    public String getTarget_device() {
        return target_device;
    }

    /**
     * 设置
     * @param target_device
     */
    public void setTarget_device(String target_device) {
        this.target_device = target_device;
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
        return "PubDto{target_device = " + target_device + ", horizon_angle = " + horizon_angle + ", vertical_angle = " + vertical_angle + "}";
    }
}
