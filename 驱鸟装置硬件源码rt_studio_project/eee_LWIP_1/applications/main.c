/*
 * Copyright (c) 2006-2025, RT-Thread Development Team
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Change Logs:
 * Date           Author       Notes
 * 2025-03-11     RT-Thread    first version
 */

#include <rtthread.h>
#include <board.h>
#include <rtdevice.h>
#define DBG_TAG "main"
#define DBG_LVL DBG_LOG
#include <rtdbg.h>
#include "command.h"
#include "mqtt_api.h"
#include <motor.h>
#include <math.h>
#include <stdlib.h>
//
#include "lwip/netif.h"


#define STOP_PIN  GET_PIN(D,7)
#define LED1_PIN  GET_PIN(B,0)
#define LED2_PIN  GET_PIN(B,1)
#define CLAER_BULLET_PIN  GET_PIN(B,2)
#define SEN1      GET_PIN(E,9)
#define SEN2      GET_PIN(D,2)
#define SEN3      GET_PIN(D,1)
#define SEN4      GET_PIN(D,3)
#define NOISE     GET_PIN(D,10)

//pwm
#define PWM_DEV "pwm1"
static struct rt_device_pwm* pwm_dev;
rt_uint32_t period = 480000;
rt_uint32_t pulse = 384000;
//
/* 定义一个MQTT线程句柄结构体指针 */
static rt_thread_t app_mqtt_thread = RT_NULL;
static rt_thread_t uart6_rx_thread = RT_NULL;
static rt_thread_t uart2_rx_thread = RT_NULL;

//电机2线程
ALIGN(RT_ALIGN_SIZE)
static char Motor_Detection_stack[1024];
static struct rt_thread Motor_Detection;
static void Motor_Detection_Entry(void *param);

int stop_flag = 1;
int protection_flag = 1;
int posinit_ok = 0;
int mqtt_init_ok = 1;
int is_firing = 0;
int err_code = 0;
struct rt_semaphore sem_send_instrction;

//UART
struct serial_configure uart_config  = RT_SERIAL_CONFIG_DEFAULT;


struct netif *netif;
rt_uint32_t phy_addr = 0x00;

rt_int8_t  rx_buffer_index=0;
rt_int8_t  rx_buffer_index_uart2=0;
void pwm_Init(void);
void UART6_Init(void);
void UART2_Init(void);
void motor_pos_init(void);
void motor2_test_function(void);
void motor_pos_init(void);


void phy_reset(rt_uint32_t phy_addr){
}

//
rt_uint8_t load_buffer[24];
//
void PIN_EXIT7_Init(void);
void READ_PIN_Init(void);
void pwm_enable(void);
void pwm_disable(void);
static rt_err_t app_mqtt_init(void);
static void app_mqtt_thread_entry(void *parameter);
static rt_err_t uart6_rx_thread_init(void);
static void uart6_rx_thread_entry(void *parameter);
static rt_err_t uart2_rx_thread_init(void);
static void uart2_rx_irq(void *parameter);
rt_err_t uart6_RX_IT_function(rt_device_t dev, rt_size_t size);
rt_err_t uart2_RX_IT_function(rt_device_t dev, rt_size_t size);

int main(void)
{
    rt_sem_init(&sem_wait_for_rx6,"sem_wait_for_rx6",0, RT_IPC_FLAG_FIFO);
    rt_sem_init(&sem_wait_for_rx2,"sem_wait_for_rx2",0, RT_IPC_FLAG_FIFO);
    rt_sem_init(&sem_send_instrction,"sem_send_instrction",1, RT_IPC_FLAG_FIFO);
    UART6_Init();
//

    PIN_EXIT7_Init();
    READ_PIN_Init();
    uart6_rx_thread_init();

    rt_thread_init(&Motor_Detection,"Motor_Detection",Motor_Detection_Entry,RT_NULL, &Motor_Detection_stack[0],sizeof(Motor_Detection_stack), 9, 20);
    rt_thread_startup(&Motor_Detection);

    rt_thread_delay(1000);

    app_mqtt_init();



    return RT_EOK;
}

void test(int argc, char *argv[]){

    if (argc != 2) {
        rt_kprintf("Usage: %s <number between -60 and 60>\n", argv[0]);
        return 1;
    }

    char *endptr;
    long num;
    errno = 0; // 重置错误标志
    num = strtol(argv[1], &endptr, 10);

    // 检查转换错误
    if (errno != 0 || *endptr != '\0') {
        rt_kprintf("Error: Invalid number format\n");
        return 1;
    }

    // 检查范围
    if (num < -60 || num > 60) {
        rt_kprintf("Error: Number out of range. Must be between -60 and 60.\n");
        return 1;
    }

    rt_uint8_t Motor1_Init_STEP1_buffer[24];
    adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED_INIT,num,(unsigned char*)Motor1_Init_STEP1_buffer);
    rt_device_write(uart_dev6, 0, Motor1_Init_STEP1_buffer, 23);
}
/********************************************************
 * Function name     :   motor_pos_init
 * Description       :   电机位置初始化函数，用于将水平和俯
  *                                                 仰电机的位置调整到程序定义的零点位
  *                                                 置。
 *
 * Parameter         :   无
 * Return            :   无
**********************************************************/
void motor_pos_init(void)
{
    //俯仰电机位置初始化
    rt_uint8_t Motor2_Init_STEP1_buffer[24];
    rt_uint8_t Motor2_Init_STEP2_buffer[24];
    adPoscmd32(2,ACCSPEED,DECSPEED,V_SPEED_INIT,180,(unsigned char*)Motor2_Init_STEP1_buffer);
    adPoscmd32(2,ACCSPEED,DECSPEED,V_SPEED_INIT,-14,(unsigned char*)Motor2_Init_STEP2_buffer);
    rt_sem_take(&sem_send_instrction, RT_WAITING_FOREVER);
    rt_device_write(uart_dev6, 0, Motor2_Init_STEP1_buffer, 23);  //电机向上旋转180度，物理最大范围，一定会触发堵转，堵转后自动停止
    rt_thread_mdelay(100);
    rt_sem_release(&sem_send_instrction);

    //没堵转前一直在while里，若判断到堵转，跳出while（之前用标志位的逻辑）
    //现在的逻辑是，若堵转，则进while，没堵转，跳出while
    while(protection_flag);


    //等待电机到达堵转状态
    rt_sem_take(&sem_send_instrction, RT_WAITING_FOREVER);
//    rt_device_write(uart_dev6, 0, Motor2_remove_block_state_buffer, 8);     //解除堵转保护
//    rt_thread_mdelay(50);
    rt_device_write(uart_dev6, 0, Motor2_remove_block_state_buffer, 8);
    rt_thread_mdelay(50);
    rt_device_write(uart_dev6, 0, Motor2_Init_STEP2_buffer, 23);            //回转4度到垂直状态
    rt_thread_mdelay(1000);
    rt_sem_release(&sem_send_instrction);

    //水平电机位置初始化
    rt_uint8_t Motor1_Init_STEP1_buffer[24];
    rt_uint8_t Motor1_Init_STEP2_buffer[24];
    rt_uint8_t Motor1_Init_STEP0_buffer[24];
    rt_uint8_t Motor1_Init_STEP3_buffer[24];

    adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED_INIT,10,(unsigned char*)Motor1_Init_STEP0_buffer);
    adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED_INIT,-60,(unsigned char*)Motor1_Init_STEP1_buffer);
    adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED_INIT,60,(unsigned char*)Motor1_Init_STEP2_buffer);
    adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED_INIT,58,(unsigned char*)Motor1_Init_STEP3_buffer);

    rt_sem_take(&sem_send_instrction, RT_WAITING_FOREVER);//获取信号量
    rt_device_write(uart_dev6, 0, Motor1_remove_block_state_buffer, 8);//解堵转
    rt_thread_mdelay(10);
    //stop_flag=1;
    if(stop_flag){
    rt_device_write(uart_dev6, 0, Motor1_Init_STEP1_buffer, 23);//-120度
    rt_thread_mdelay(5000); //等待电机到达堵转状态，并分割串口数据
    }
    if(stop_flag){
        rt_device_write(uart_dev6, 0, Motor1_Init_STEP2_buffer, 23);//120度
        rt_thread_mdelay(5000);
        if(!stop_flag){
            rt_device_write(uart_dev6, 0, Motor1_Init_STEP3_buffer, 23);//58度
            rt_thread_mdelay(3000);
        }
    }
    else{
        rt_device_write(uart_dev6, 0, Motor1_Init_STEP3_buffer, 23);//58度
        rt_thread_mdelay(3000);
    }



    rt_device_write(uart_dev6, 0, clear_angle_motor1, 8);
    rt_thread_mdelay(500);
    rt_device_write(uart_dev6, 0, clear_angle_motor2, 8);
    rt_thread_mdelay(500);
    posinit_ok =1;
    rt_sem_release(&sem_send_instrction);

}
/********************************************************
 * Function name     :   UART6_Init
 * Description       :   串口6初始化函数
 *
 * Parameter         :   无
 * Return            :   无
**********************************************************/
void UART6_Init(){
    rt_int8_t result = 0;
    uart_dev6 = rt_device_find("uart6");
    //uart_dev = rt_device_find("uart1");
    if(uart_dev6 == RT_NULL) rt_kprintf("find failed\n");
    //打开设备
    rt_device_open(uart_dev6,RT_DEVICE_FLAG_RDWR | RT_DEVICE_FLAG_INT_RX);

    if(result<0)
        rt_kprintf("open_failed\n");
    else{
        rt_device_control(uart_dev6,RT_DEVICE_CTRL_CONFIG,(void*)&uart_config);
        rt_device_set_rx_indicate(uart_dev6, uart6_RX_IT_function);  //设置串口接收回调函数
    }
}
/********************************************************
 * Function name     :   UART2_Init
 * Description       :   串口2初始化函数
 *
 * Parameter         :   无
 * Return            :   无
**********************************************************/
void UART2_Init(){
    rt_int8_t result = 0;
    uart_dev2 = rt_device_find("uart2");
    if(uart_dev2 == RT_NULL) rt_kprintf("find failed\n");
    //打开设备
    rt_device_open(uart_dev2,RT_DEVICE_FLAG_RDWR | RT_DEVICE_FLAG_INT_RX);

    if(result<0)
        rt_kprintf("open_failed\n");
    else{
        rt_device_control(uart_dev2,RT_DEVICE_CTRL_CONFIG,(void*)&uart_config);
        rt_device_set_rx_indicate(uart_dev2, uart2_RX_IT_function);  //设置串口接收回调函数
    }
}

static void Motor_Detection_Entry(void *param)
{
    rt_uint8_t noreceiveflag=0;
    rt_uint8_t v_return_buffer[24];
    rt_uint8_t h_return_buffer[24];
    rt_int32_t realpos1;
    rt_int32_t realpos2;
    while(1)
    {

        rt_uint8_t re1 = updateflag(&mst1);
        rt_uint8_t re2 = updateflag(&mst2);

        if( !re1 || !re2)
        {
            rt_kprintf("No_recive\n");
            noreceiveflag=1;
        }
        else {
            noreceiveflag=0;
        }

        if(mst2.mst.protectionflag){
            rt_enter_critical();
            protection_flag=0;
            rt_exit_critical();
            //若在此解除堵转，则电机初始化失败，因为获取不到堵转标志了
            if(posinit_ok ==1){
            rt_device_write(uart_dev6, 0, Motor2_remove_block_state_buffer, 8);
            rt_thread_mdelay(10);
            }
        }
        else {
            rt_enter_critical();
            protection_flag=1;
            rt_exit_critical();
        }

        if(!noreceiveflag){
        mst2.mst.realtimepos =get_realtimepos(&mst2);
        mst1.mst.realtimepos =get_realtimepos(&mst1);
        }






if(!is_firing&&(posinit_ok==1)){
        realpos1 = mst1.mst.realtimepos;
        realpos2 = mst2.mst.realtimepos;
        if(mst2.mst.realtimepos<0)realpos2 = -realpos2;
        if(mst1.mst.realtimepos<0)realpos1 = -realpos1;
        /*         以下while用于打完炮串口乱码，电机没归位            */
        while(realpos1>62 || realpos2>160){
            mst2.mst.realtimepos =get_realtimepos(&mst2);
            mst1.mst.realtimepos =get_realtimepos(&mst1);
            realpos1 = mst1.mst.realtimepos;
            realpos2 = mst2.mst.realtimepos;
            //adPoscmd32(2, ACCSPEED, DECSPEED, V_SPEED, -realpos2/800, (unsigned char*)v_return_buffer);
            //adPoscmd32(1, ACCSPEED, DECSPEED, H_SPEED, -realpos1/310, (unsigned char*)h_return_buffer);
            adPoscmd32_absolute(2, ACCSPEED, DECSPEED, V_SPEED, 0, (unsigned char*)v_return_buffer);
            adPoscmd32_absolute(1, ACCSPEED, DECSPEED, H_SPEED, 0, (unsigned char*)h_return_buffer);
            if(mst2.mst.realtimepos<0)realpos2 = -realpos2;
            if(mst1.mst.realtimepos<0)realpos1 = -realpos1;
            if(realpos2>160){
            //拿信号量
                rt_device_write(uart_dev6, 0, v_return_buffer, 23);
                rt_thread_delay(10);
            }
            if(realpos1>62){
                rt_device_write(uart_dev6, 0, h_return_buffer, 23);
                //释放信号量
                rt_thread_delay(10);
            }
            rt_kprintf("in this circle");
            //rt_thread_delay(((horizon_angle)>(vertical_angle)? (horizon_angle):(vertical_angle))*44);
            rt_thread_delay(2000);
        }
}


//        rt_kprintf("motor1:%d\n",mst1.motoraddr);
//        rt_kprintf("enable1:%d\n",mst1.mst.enableflag);
//        rt_kprintf("palce1:%d\n",mst1.mst.placeflag);
//        rt_kprintf("protection1:%d\n",mst1.mst.protectionflag);
//        rt_kprintf("motor2:%d\n",mst2.motoraddr);
//        rt_kprintf("enable2:%d\n",mst2.mst.enableflag);
//        rt_kprintf("palce2:%d\n",mst2.mst.placeflag);
        rt_kprintf("protection2:%d\n",mst2.mst.protectionflag);
        rt_kprintf("realpos2:%d\n",mst2.mst.realtimepos);
        rt_kprintf("realpos1:%d\n",mst1.mst.realtimepos);
        rt_thread_delay(50);
    }

}



rt_err_t MOTOR1_STOP_IQR_HANDALE(void *args){ //电机1立即停止外部中断
  if(stop_flag){
    stop_flag=0;
    rt_device_write(uart_dev6, 0, MOTOR1_STOP_BUFFER,11);
    }

    return RT_EOK;
}
void PIN_EXIT7_Init(){
    rt_pin_mode(STOP_PIN, PIN_MODE_INPUT_PULLDOWN);
    rt_pin_attach_irq(STOP_PIN, PIN_IRQ_MODE_RISING, MOTOR1_STOP_IQR_HANDALE, RT_NULL);
    rt_pin_irq_enable(STOP_PIN,PIN_IRQ_ENABLE);
}

void READ_PIN_Init(){
    rt_pin_mode(NOISE, PIN_MODE_INPUT_PULLDOWN);

    rt_pin_mode(CLAER_BULLET_PIN, PIN_MODE_OUTPUT);//吹气控制
    rt_pin_write(CLAER_BULLET_PIN, PIN_LOW);

    rt_pin_mode(SEN1, PIN_MODE_OUTPUT);//点火控制
    rt_pin_write(SEN1, PIN_LOW);

    rt_pin_mode(SEN2, PIN_MODE_INPUT);
    rt_pin_mode(SEN3, PIN_MODE_INPUT);
    rt_pin_mode(SEN4, PIN_MODE_INPUT);
}
/*
 * UART
 */
rt_err_t uart6_RX_IT_function(rt_device_t dev, rt_size_t size){//串口接收回调函数
    if(size >0){
    rt_sem_release(&sem_wait_for_rx6);//读取后，释放信号量。
    }
    return RT_EOK;
}
rt_err_t uart2_RX_IT_function(rt_device_t dev, rt_size_t size){//串口接收回调函数
    if(size >0){
    rt_sem_release(&sem_wait_for_rx2);//读取后，释放信号量。
    }
    return RT_EOK;
}
static rt_err_t uart6_rx_thread_init(void)
{
    rt_err_t rt_err;
    /* 创建uart线程*/
    uart6_rx_thread = rt_thread_create("uart6_rx_thread",
            uart6_rx_thread_entry, RT_NULL, 4096, 6, 10);
    /* 如果获得线程控制块，启动这个线程 */
    if (uart6_rx_thread != RT_NULL)
        rt_err = rt_thread_startup(uart6_rx_thread);
    else
        rt_kprintf("uart_rx_thread create failure !!! \n");

    /* 判断线程是否启动成功 */
    if( rt_err == RT_EOK)
        rt_kprintf("uart_rx_thread startup ok. \n");
    else
        rt_kprintf("uart_rx_thread startup err. \n");

    return rt_err;
}

static void uart6_rx_thread_entry(void *parameter)
{
    rt_uint8_t ch=0;
    rt_uint8_t r=1;
    while (1)
    {


        /* 从串口读取一个字节的数据，没有读取到则等待接收信号量 */
        while (rt_device_read(uart_dev6, -1, &ch, 1) != 1)
        {
            /* 阻塞等待接收信号量，等到信号量后再次读取数据 */
            rt_sem_take(&sem_wait_for_rx6, RT_WAITING_FOREVER);
            realrxflag=1;
        }

        //这里的if判断看似没有逻辑，实则确实没有逻辑作用，只是不写的话，信号量直接崩
        if(rx_buffer_index<MAX_BACK_FRAME_SIZE){
        realrxflag=1;
        rx_state_buffer[rx_buffer_index++]=ch;
        }
        //next_rx_data_size++;

    }
}

static void uart2_rx_irq(void *parameter)
{
    rt_uint8_t ch=0;
    rt_uint8_t r=1;
    while (1)
    {
        /* 从串口读取一个字节的数据，没有读取到则等待接收信号量 */
        while (rt_device_read(uart_dev2, -1, &ch, 1) != 1)
        {
            /* 阻塞等待接收信号量，等到信号量后再次读取数据 */
            rt_sem_take(&sem_wait_for_rx2, RT_WAITING_FOREVER);
            realrxflag=1;
        }
        //这里的if判断看似没有逻辑，实则确实没有逻辑作用，只是不写的话，信号量直接崩
        if(rx_buffer_index_uart2<MAX_BACK_FRAME_SIZE_UART2){
        realrxflag=1;
        rx_state_buffer2[rx_buffer_index_uart2++]=ch;
        }
        //next_rx_data_size++;
    }
}
/*
 * MQTT
 */
static rt_err_t app_mqtt_init(void)
{
    rt_err_t rt_err;
    /* 创建MQTT线程*/
    app_mqtt_thread = rt_thread_create("app_mqtt thread",
            app_mqtt_thread_entry, RT_NULL, 4096, 9, 10);
    /* 如果获得线程控制块，启动这个线程 */
    if (app_mqtt_thread != RT_NULL)
        rt_err = rt_thread_startup(app_mqtt_thread);
    else
        rt_kprintf("app_mqtt_thread create failure !!! \n");

    /* 判断线程是否启动成功 */
    if( rt_err == RT_EOK)
        rt_kprintf("app_mqtt_thread startup ok. \n");
    else
        rt_kprintf("app_mqtt_thread startup err. \n");

    return rt_err;
}
static void app_mqtt_thread_entry(void *parameter)
{
    uint32_t count = 1;

    //玄学位置，谨慎修改
    motor_pos_init();
    //
    while(1){

      mqtt_example_main(0,0);

      rt_thread_delay(50);
    }

}


//此函数现在是在接收到数据后，在mqtt_arrive中调用
void parse_mqtt_message (const char* json_str)
{
    int count = 0;//装弹计数，用于检测空弹
    int maxRetryTimes=10;
    rt_uint8_t h_buffer[24];
    rt_uint8_t v_buffer[24];
    rt_uint8_t load_buffer[24];
    rt_uint8_t down_buffer[24];
    rt_uint8_t return_pos[24];
    rt_int32_t h_multi_310;
    rt_int32_t v_multi_800;
    rt_int32_t m1_l;
    rt_int32_t m1_h;
    rt_int32_t m2_l;
    rt_int32_t m2_h;
    // 提取完整设备名称
    char motor_device[MAX_LEN] = {0};
    char* device_start = strstr(json_str, "\"TargetDevice\":\"");
    if (device_start) {
        device_start += strlen("\"TargetDevice\":\""); // 定位到值起始位置
        char* device_end = strchr(device_start, '\"'); // 查找值结束引号
        if (device_end) {
            int len = device_end - device_start;      // 计算值长度
            len = (len < MAX_LEN-1) ? len : MAX_LEN-1; // 防止溢出
            strncpy(motor_device, device_start, len);
            motor_device[len] = '\0';                 // 添加字符串终止符
        }
    }

    // 提取角度值（保持原逻辑）
    int horizon = 0, vertical = 0;
    extract_value(json_str, "horizon_angle", &horizon);
    extract_value(json_str, "vertical_angle", &vertical);

    horizon_angle = horizon;
    vertical_angle = vertical+10;
    h_multi_310=(horizon_angle)*310;
    v_multi_800=(vertical_angle)*800;
    //电机到装弹处逻辑
    rt_enter_critical();
    is_firing = 1;
    rt_exit_critical();

    adPoscmd32(2, ACCSPEED, DECSPEED, V_SPEED, 10,(unsigned char*)return_pos);
    rt_device_write(uart_dev6, 0, return_pos, 23);
    rt_thread_delay(2500);

    //

    //装弹逻辑
    do{
        adPoscmd32(3, 150, 150, 300, -60,(unsigned char*)load_buffer);
        if(rt_pin_read(SEN4)==PIN_HIGH){
            rt_pin_write(LED1_PIN, PIN_LOW);
            err_code&=~(0x01<<0);
            break;
        }
        else{
            count++;
            rt_device_write(uart_dev6, 0, load_buffer, 23);
            rt_thread_delay(3000);
        }
    }while((rt_pin_read(SEN4)==PIN_LOW)&&(count<6));
    //正常流程走if里面，如果一直没弹走else

    if(count<6){
        err_code&=~(0x01<<0);
        rt_device_write(uart_dev6, 0, load_buffer, 23);
        rt_thread_delay(3000);
        //

        adPoscmd32_absolute(2,ACCSPEED,DECSPEED,V_SPEED,vertical_angle,(unsigned char*)v_buffer);
        adPoscmd32_absolute(1,ACCSPEED,DECSPEED,H_SPEED,horizon_angle,(unsigned char*)h_buffer);
again:
        rt_device_write(uart_dev6, 0, v_buffer, 23);
        rt_thread_mdelay(50);
        rt_device_write(uart_dev6, 0, h_buffer, 23);

/*********************************************************************************************/

        mst2.mst.realtimepos =get_realtimepos(&mst2);
        mst1.mst.realtimepos =get_realtimepos(&mst1);
        //rt_thread_mdelay(3000);
        m1_l=mst1.mst.realtimepos-310;
        m1_h=mst1.mst.realtimepos+310;
        m2_l=mst2.mst.realtimepos-800;
        m2_h=mst2.mst.realtimepos+800;

        if((h_multi_310>=m1_l && h_multi_310<=m1_h) && (v_multi_800>=m2_l && v_multi_800<=m2_h)){
            rt_pin_write(SEN1, PIN_HIGH);//点火
            rt_thread_mdelay(500);
            rt_pin_write(SEN1, PIN_LOW);//关火
            rt_thread_mdelay(5000);//模拟发炮的延时
        }else {
            maxRetryTimes--;    //最多尝试10次，还没有到位就直接跳过本次点火
            if(maxRetryTimes)
                goto again;
        }



/*********************************************************************************************/
        //判断俯仰电机是否被转到堵转
        if(mst2.mst.protectionflag){
            adPoscmd32(2,ACCSPEED,DECSPEED,V_SPEED,-4,(unsigned char*)v_buffer);
            rt_device_write(uart_dev6, 0, Motor2_remove_block_state_buffer, 8);
            rt_thread_mdelay(10);
        }
        else{
            adPoscmd32(2,ACCSPEED,DECSPEED,V_SPEED,-vertical_angle,(unsigned char*)v_buffer);
        }
        adPoscmd32(1,ACCSPEED,DECSPEED,H_SPEED,-horizon_angle,(unsigned char*)h_buffer);
        //rt_device_write(uart_dev6, 0, v_buffer, 23);
        //rt_thread_mdelay(1000);
        rt_device_write(uart_dev6, 0, h_buffer, 23);
        rt_thread_mdelay(1000);
    }
    else{
        err_code = 1;
        rt_kprintf("no bullet\n");
    }
    //声音传感器
    if(err_code==1){
        rt_kprintf("no bullet\n");
    }
    else{
        if(rt_pin_read(NOISE)==PIN_HIGH){
            rt_kprintf("发炮成功");
        }
        else{
            adPoscmd32(2,ACCSPEED,DECSPEED,V_SPEED,-120-vertical_angle,(unsigned char*)down_buffer);
            rt_device_write(uart_dev6, 0, down_buffer, 23);
            rt_thread_mdelay(3000);
            rt_pin_write(CLAER_BULLET_PIN, PIN_HIGH);//触发继电器，打开电磁阀
            rt_thread_mdelay(500);
            rt_pin_write(CLAER_BULLET_PIN, PIN_LOW);//关闭电磁阀，停止吹气
            rt_thread_mdelay(1000);
        }
    }


    //

    rt_enter_critical();
    is_firing = 0;
    rt_exit_critical();

    rt_kprintf("TargetDevice: %s\n", motor_device);
    rt_kprintf("horizon_angle: %d\n", horizon);
    rt_kprintf("vertial_angle: %d\n", vertical);
}

#ifdef FINSH_USING_MSH
MSH_CMD_EXPORT_ALIAS(test, test, ali coap sample);
#endif
