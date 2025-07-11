//package com.quniao.config;
//
//import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.integration.annotation.IntegrationComponentScan;
//import org.springframework.integration.annotation.ServiceActivator;
//import org.springframework.integration.channel.DirectChannel;
//import org.springframework.integration.core.MessageProducer;
//import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
//import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
//import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
//import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.MessageHandler;
//import org.springframework.messaging.MessagingException;
//
//
//
//@Configuration
//@IntegrationComponentScan
//public class MqttService {
//
//    //此处填DNS解析后对应的ip地址
//    String productKey = "a18YHu3ff1d";
//    String deviceName = "phone";
//    String deviceSecret = "cba38b582c49d8a2ee2390c11ec39077";
//    private String hostUrl = "tcp://a18YHu3ff1d.iot-as-mqtt.cn-shanghai.aliyuncs.com:1883";
//    //剩下部分填写其余对应的信息即可
//    private String username = "phone&a18YHu3ff1d";
//    private String password = "14D5E70216BE19909D343178B488CD5355B89509";
//    private String clientId = "phone|securemode=3,signmethod=hmacsha1,timestamp=789|";
//    private String recvTopic =  "/a18YHu3ff1d/phone/user/get";
//
//    @Bean
//    public MqttConnectOptions getMqttConnectOptions() {
//        MqttConnectOptions mqttConnectOptions = new MqttConnectOptions();
//        mqttConnectOptions.setCleanSession(true);
//        mqttConnectOptions.setConnectionTimeout(10);
//        mqttConnectOptions.setKeepAliveInterval(60);
//        mqttConnectOptions.setAutomaticReconnect(true);
//        mqttConnectOptions.setUserName(username);
//        mqttConnectOptions.setPassword(password.toCharArray());
//        mqttConnectOptions.setServerURIs(new String[]{hostUrl});
//        return mqttConnectOptions;
//    }
//
//    @Bean
//    public MqttPahoClientFactory mqttClientFactory() {
//        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
//        factory.setConnectionOptions(getMqttConnectOptions());
//        return factory;
//    }
//
//    @Bean
//    public MessageChannel mqttInputChannel() {
//        return new DirectChannel();
//    }
//
//    @Bean
//    public MessageProducer inbound() {
//
//        MqttPahoMessageDrivenChannelAdapter adapter =
//                new MqttPahoMessageDrivenChannelAdapter(clientId, mqttClientFactory(), recvTopic);
//        adapter.setCompletionTimeout(5000);
//        adapter.setConverter(new DefaultPahoMessageConverter());
//        adapter.setQos(1);
//        adapter.setOutputChannel(mqttInputChannel());
//        return adapter;
//    }
//
//    @Bean
//    @ServiceActivator(inputChannel = "mqttInputChannel")
//    public MessageHandler handler() {
//        return new MessageHandler() {
//            @Override
//            public void handleMessage(Message<?> message) throws MessagingException {
//                //此处添加处理方法
//                //传入的消息是用message.getPayload().toString()得到
//                //传入的topic名字用message.getHeaders().get("mqtt_receivedTopic").toString()得到
//                System.out.println(message.getPayload().toString());
//            }
//        };
//    }
//}
