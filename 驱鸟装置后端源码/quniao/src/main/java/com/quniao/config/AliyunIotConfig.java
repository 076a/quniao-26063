// This file is auto-generated, don't edit it. Thanks.
package com.quniao.config;

import com.aliyun.tea.*;

public class AliyunIotConfig {

    /**
     * <b>description</b> :
     * <p>使用AK&amp;SK初始化账号Client</p>
     * @return Client
     *
     * @throws Exception
     */
    public static com.aliyun.iot20180120.Client createClient() throws Exception {
        com.aliyun.teaopenapi.models.Config config = new com.aliyun.teaopenapi.models.Config()
                // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
                .setAccessKeyId(AliyunIotConfig.accessKeyId)
                // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
                .setAccessKeySecret(AliyunIotConfig.accessKeySecret);
        // Endpoint 请参考 https://api.aliyun.com/product/Iot
        config.endpoint = AliyunIotConfig.endpoint;
        return new com.aliyun.iot20180120.Client(config);
    }

}
