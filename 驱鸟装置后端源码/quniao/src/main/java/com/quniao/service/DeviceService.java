package com.quniao.service;

import com.quniao.pojo.dto.DeviceInfoDto;
import com.quniao.pojo.dto.PubDto;
import org.springframework.stereotype.Service;

@Service
public interface DeviceService {
    void pub(PubDto pubDto) throws Exception;

    String getStatus(String productKey, String deviceName);
}
