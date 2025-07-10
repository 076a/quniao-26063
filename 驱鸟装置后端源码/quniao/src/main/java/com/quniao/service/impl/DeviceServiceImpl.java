package com.quniao.service.impl;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.util.TypeUtils;
import com.alibaba.fastjson2.JSON;
import com.aliyun.iot20180120.Client;
import com.aliyun.iot20180120.models.GetDeviceStatusResponse;
import com.aliyun.iot20180120.models.PubResponse;
import com.aliyun.iot20180120.models.QueryDeviceInfoResponse;
import com.aliyun.tea.TeaException;
import com.quniao.config.AliyunIotConfig;
import com.quniao.exception.BaseException;
import com.quniao.pojo.dto.DeviceInfoDto;
import com.quniao.pojo.dto.PubDto;
import com.quniao.pojo.entity.Pub;
import com.quniao.service.DeviceService;
import com.quniao.util.Base64Util;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class DeviceServiceImpl implements DeviceService {
    @Override
    public void pub(PubDto pubDto) {
        Pub pub=new Pub();
        BeanUtils.copyProperties(pubDto,pub);
        pub.setTargetDevice(pubDto.getTarget_device());
        String json = "{\"TargetDevice\":\"" + pub.getTargetDevice() + "\",\"horizon_angle\":" + pub.getHorizon_angle() + ",\"vertical_angle\":" + pub.getVertical_angle() + "}";
        String encode = Base64Util.encode(json);

        Client client=null;
        try {
            client = AliyunIotConfig.createClient();
        }catch (Exception baseException){
            throw new BaseException("设备连接失败");
        }

        com.aliyun.iot20180120.models.PubRequest pubRequest = new com.aliyun.iot20180120.models.PubRequest()
                .setMessageContent(encode)
                .setProductKey("a18YHu3ff1d") //为了方便暂时写死
                .setTopicFullName("/a18YHu3ff1d/phone/user/update");
        com.aliyun.teautil.models.RuntimeOptions runtime = new com.aliyun.teautil.models.RuntimeOptions();
        try {
            PubResponse pubResponse = client.pubWithOptions(pubRequest, runtime);
            System.out.println(pubResponse.getBody().getSuccess());
        } catch (TeaException error) {
            System.out.println(error.getMessage());
            System.out.println(error.getData().get("Recommend"));
            com.aliyun.teautil.Common.assertAsString(error.message);
        } catch (Exception _error) {
            TeaException error = new TeaException(_error.getMessage(), _error);
            System.out.println(error.getMessage());
            System.out.println(error.getData().get("Recommend"));
            com.aliyun.teautil.Common.assertAsString(error.message);
        }
    }

    @Override
    public String getStatus(String productKey, String deviceName) {
        Client client=null;
        try {
            client = AliyunIotConfig.createClient();
        }catch (Exception baseException){
            throw new BaseException("设备连接失败");
        }
        com.aliyun.iot20180120.models.GetDeviceStatusRequest getDeviceStatusRequest = new com.aliyun.iot20180120.models.GetDeviceStatusRequest()
                .setProductKey(productKey)
                .setDeviceName(deviceName);
        com.aliyun.teautil.models.RuntimeOptions runtime = new com.aliyun.teautil.models.RuntimeOptions();
        try {
            GetDeviceStatusResponse deviceStatusWithOptions = client.getDeviceStatusWithOptions(getDeviceStatusRequest, runtime);
            System.out.println(deviceStatusWithOptions.getBody().getSuccess());
            return deviceStatusWithOptions.getBody().getData().getStatus();
        } catch (TeaException error) {
            System.out.println(error.getMessage());
            System.out.println(error.getData().get("Recommend"));
            com.aliyun.teautil.Common.assertAsString(error.message);
            return null;
        } catch (Exception _error) {
            TeaException error = new TeaException(_error.getMessage(), _error);
            System.out.println(error.getMessage());
            System.out.println(error.getData().get("Recommend"));
            com.aliyun.teautil.Common.assertAsString(error.message);
            return null;
        }
    }
}
