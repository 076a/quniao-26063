/*
 * Copyright (c) 2006-2021, RT-Thread Development Team
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Change Logs:
 * Date           Author       Notes
 * 2025-03-17     Lenovo       the first version
 */
#ifndef APPLICATIONS_STRUCT_H_
#define APPLICATIONS_STRUCT_H_

#include <rtthread.h>

#define NO_RECEIVE 0x1
#define MAX_BACK_FRAME_SIZE 20
#define MAX_BACK_FRAME_SIZE_UART2 100
#define MAX_LEN 32
#define H_SPEED_INIT  ((int)300)
#define V_SPEED_INIT  ((int)800)
#define H_SPEED  ((int)2000)
#define V_SPEED  ((int)2000)
#define ACCSPEED ((int)1500)
#define DECSPEED ((int)1500)

typedef enum errorreason{
    motor_ok=1,update_ok,
    noreceive,
    enable,disable,
    inplace,noplace,
    unblocked,blocked,
    noprotection,protection
}errorreason;

typedef struct{
    rt_uint16_t direction;          //旋转方向，位于读实时位置角度返回信息的寄存器1
    rt_int32_t targetpos;
    rt_int32_t realtimepos;        //实时位置角度
    rt_uint8_t enableflag;          //使能状态标志
    rt_uint8_t placeflag;           //电机到位标志
    rt_uint8_t blockflag;           //电机堵转标志
    rt_uint8_t protectionflag;      //堵转保护标志
}state,* state_ptr;

typedef struct{
    rt_uint8_t motoraddr;
    state mst;
}motorstate,* motorstate_ptr;


extern rt_uint8_t rx_state_buffer[MAX_BACK_FRAME_SIZE];//读取电机状态标志位（用于获取堵转标志）
extern rt_uint8_t rx_state_buffer2[MAX_BACK_FRAME_SIZE_UART2];//超级网口的接收buffer
extern rt_uint8_t Motor2_read_block_state_buffer[8];//立即停止指令
extern rt_uint8_t Motor2_check_block_state_buffer[8];//单片机接收到的状态BUFFER
extern rt_uint8_t Motor2_remove_block_state_buffer[8];//解除堵转标志位，使电机可以正常活动
extern rt_uint8_t MOTOR1_STOP_BUFFER[11];//立即停止指令
extern rt_uint8_t MOTOR2_STOP_BUFFER[11];
extern rt_uint8_t Turn_off_drv_board1[13];//关闭驱动板1
extern rt_uint8_t Turn_off_drv_board2[13];//关闭驱动板2
extern rt_uint8_t Turn_on_drv_board1[13];//开启驱动板1
extern rt_uint8_t Turn_on_drv_board2[13];//开启驱动板2
extern rt_uint8_t recive_angle_data1[8];//读取电机1的实时角度
extern rt_uint8_t recive_angle_data2[8];//读取电机2的实时角度
extern rt_uint8_t clear_angle_motor1[8];//电机1，当前位置角度清零
extern rt_uint8_t clear_angle_motor2[8];//电机2，当前位置角度清零
extern rt_uint8_t Motor1_remove_block_state_buffer[8];
extern int horizon_angle;
extern int vertical_angle;
extern int err_code;
extern struct rt_semaphore sem_wait_for_rx6;
extern struct rt_semaphore sem_wait_for_rx2;
extern struct rt_semaphore sem_send_instrction;

extern rt_size_t rx_data_size;
extern rt_size_t next_rx_data_size;
extern rt_device_t uart_dev6;
extern rt_device_t uart_dev2;
extern rt_int8_t rx_buffer_index;
extern rt_uint8_t realrxflag;
extern rt_uint8_t realrxflag2;

extern motorstate mst1;
extern motorstate mst2;




errorreason is_enable(motorstate_ptr);
errorreason is_place(motorstate_ptr);
errorreason is_protection(motorstate_ptr);
errorreason updateflag(motorstate_ptr p);
rt_int32_t get_realtimepos(motorstate_ptr p);



#endif /* APPLICATIONS_STRUCT_H_ */
