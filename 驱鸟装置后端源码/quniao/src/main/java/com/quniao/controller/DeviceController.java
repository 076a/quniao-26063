package com.quniao.controller;

import com.quniao.pojo.dto.DeviceInfoDto;
import com.quniao.pojo.dto.PubDto;
import com.quniao.pojo.result.Result;
import com.quniao.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/device")
@CrossOrigin
public class DeviceController {
    @Autowired
    private DeviceService deviceService;
    @PostMapping("/pub")
    public Result pub(@RequestBody PubDto pubDto) throws Exception {
        if(pubDto.getHorizon_angle()<-60 || pubDto.getHorizon_angle()>60 || pubDto.getVertical_angle()>0 || pubDto.getVertical_angle()<-90){
            return Result.error("数据超出范围");
        }
        System.out.println(pubDto);
        deviceService.pub(pubDto);
        return Result.success();
    }

    @GetMapping("/getStatus")
    public Result getStatus(String productKey,String deviceName){
        System.out.println(productKey);
        System.out.println(deviceName);
        String status = deviceService.getStatus(productKey, deviceName);
        return Result.success(status);
    }
}
