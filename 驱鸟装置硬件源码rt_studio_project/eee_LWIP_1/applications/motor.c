/*
 * Copyright (c) 2006-2021, RT-Thread Development Team
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Change Logs:
 * Date           Author       Notes
 * 2025-03-17     Lenovo       the first version
 */
#include <motor.h>
#include <rtthread.h>
#include <board.h>
#include <rtdevice.h>



int horizon_angle=0;
int vertical_angle=0;

rt_uint8_t rx_state_buffer[MAX_BACK_FRAME_SIZE];//接收电机返回状态数据的BUFFER
rt_uint8_t rx_state_buffer2[MAX_BACK_FRAME_SIZE_UART2];//超级网口用的串口BUFFER
rt_uint8_t Motor2_remove_block_state_buffer[8] ={0x02,0x06,0x00,0x0E,0x00,0x01,0x29,0xFA};//解除堵转标志位，使电机可以正常活动
rt_uint8_t Motor1_remove_block_state_buffer[8] ={0x01,0x06,0x00,0x0E,0x00,0x01,0x29,0xC9};//解除堵转标志位，使电机可以正常活动
rt_uint8_t Motor1_read_block_state_buffer[8] = {0x01,0x04,0x00,0x50,0x00,0x01,0x31,0xDB};//读取电机状态标志位（用于获取堵转标志）
rt_uint8_t Motor2_read_block_state_buffer[8] = {0x02,0x04,0x00,0x50,0x00,0x01,0x31,0xE8};//读取电机状态标志位（用于获取堵转标志）
rt_uint8_t MOTOR1_STOP_BUFFER[11] = {0x01,0x10,0x00,0xFE,0x00,0x01,0x02,0x98,0x00,0xD8,0x4E};//立即停止指令
rt_uint8_t MOTOR2_STOP_BUFFER[11] = {0x02,0x10,0x00,0xFE,0x00,0x01,0x02,0x98,0x00,0xCC,0xBE};
rt_uint8_t Turn_off_drv_board1[13]={0x01,0x10,0x00,0xE0,0x00,0x02,0x04,0xAB,0x00,0x00,0x00,0xDD,0xC3};//关闭驱动板1
rt_uint8_t Turn_off_drv_board2[13]={0x02,0x10,0x00,0xE0,0x00,0x02,0x04,0xAB,0x00,0x00,0x00,0xD2,0x87};//关闭驱动板2
rt_uint8_t Turn_on_drv_board1[13]={0x01,0x10,0x00,0xE0,0x00,0x02,0x04,0xAB,0x01,0x00,0x00,0x8C,0x03};//开启驱动板1
rt_uint8_t Turn_on_drv_board2[13]={0x02,0x10,0x00,0xE0,0x00,0x02,0x04,0xAB,0x01,0x00,0x00,0x83,0x47};//开启驱动板2
rt_uint8_t recive_angle_data1[8]={0x01,0x04,0x00,0x46,0x00,0x03,0x51,0xDE};//读取电机1的实时角度
rt_uint8_t recive_angle_data2[8]={0x02,0x04,0x00,0x46,0x00,0x03,0x51,0xED};//读取电机2的实时角度
rt_uint8_t clear_angle_motor1[8]={0x01,0x06,0x00,0x0A,0x00,0x01,0x68,0x08};//电机1，当前位置角度清零
rt_uint8_t clear_angle_motor2[8]={0x02,0x06,0x00,0x0A,0x00,0x01,0x68,0x3B};//电机2，当前位置角度清零

motorstate mst1={.motoraddr=1,.mst={0}};
motorstate mst2={.motoraddr=2,.mst={0}};


struct rt_semaphore sem_wait_for_rx6;
struct rt_semaphore sem_wait_for_rx2;
rt_size_t rx_data_size;
rt_size_t next_rx_data_size;
rt_uint8_t realrxflag=0;
rt_uint8_t realrxflag2=0;
rt_device_t uart_dev6;
rt_device_t uart_dev2;



errorreason is_enable(motorstate_ptr p)
{
    if(updateflag(p)){
        if(p->mst.enableflag)
            return enable;
        else {
            return disable;
        }
    }
    return noreceive;
}

errorreason is_place(motorstate_ptr p)
{
    if(updateflag(p)){
        if(p->mst.placeflag)
            return inplace;
        else {
            return noplace;
        }
    }
    return noreceive;
}

errorreason is_protection(motorstate_ptr p)
{
    if(updateflag(p)){
        if(p->mst.protectionflag)
            return noprotection;
        else {
            return protection;
        }
    }
    return noreceive;
}

rt_uint8_t updateflag(motorstate_ptr p)
{
    rt_uint8_t trytimes = 5;

    rt_sem_take(&sem_send_instrction, RT_WAITING_FOREVER);
retry:
    rx_buffer_index=0;

    realrxflag=0;//因为仅靠rx_data_size无法判断是否为真接收，当无法接收后串口接收线程是无法将next_rx_data_size赋值给rx_data_size,导致其一直为上次成功接收的大小。所以每次发指令前先把上次真接收标志清零再配合rx_data_size双重验证才为成功接收。

    if(p->motoraddr == 1)
        rt_device_write(uart_dev6, 0, Motor1_read_block_state_buffer,8);
    else if(p->motoraddr == 2)
        rt_device_write(uart_dev6, 0, Motor2_read_block_state_buffer,8);
    else {
        rt_kprintf("file: motor.c\n" \
                   "funtion: %s\n" \
                   ": error paramter:motoraddr no exits",__func__);
    }


    rt_thread_delay(500);

//    if((rx_data_size == 0 || realrxflag == 0) && trytimes != 0)//没有数据返回且还有重试次数，重试
    if(realrxflag == 0 && trytimes != 0)//没有数据返回且还有重试次数，重试
    {
        trytimes--;
        rx_data_size=0;
        goto retry;
    }
    else if(realrxflag == 0 && trytimes == 0)//5次重试后，仍无数据返回，于是返回错误状态
    {
        rt_sem_release(&sem_send_instrction);
        return 0;
    }


    //更新结构mototstate结构体
//    rt_kprintf("%x ",rx_state_buffer[0]);
//    rt_kprintf("%x ",rx_state_buffer[1]);
//    rt_kprintf("%x ",rx_state_buffer[2]);
//    rt_kprintf("%x ",rx_state_buffer[3]);
//    rt_kprintf("%x ",rx_state_buffer[4]);
//    rt_kprintf("%x ",rx_state_buffer[5]);
//    rt_kprintf("%x\n",rx_state_buffer[6]);

    p->mst.enableflag = rx_state_buffer[4] & 0x01;
    p->mst.placeflag = rx_state_buffer[4] & 0x02;
    p->mst.blockflag = rx_state_buffer[4] & 0x04;
    p->mst.protectionflag = rx_state_buffer[4] & 0x08;
    rt_sem_release(&sem_send_instrction);

    return 1;

}

//返回值：-1，没有数据返回

rt_int32_t get_realtimepos(motorstate_ptr p)
{
    rt_uint8_t trytimes = 5;
    rt_uint32_t pos_hi=0;
    rt_uint32_t pos_lo=0;


    rt_sem_take(&sem_send_instrction, RT_WAITING_FOREVER);
retry:
    rx_buffer_index=0;
    realrxflag=0;//因为仅靠rx_data_size无法判断是否为真接收，当无法接收后串口接收线程是无法将next_rx_data_size赋值给rx_data_size,导致其一直为上次成功接收的大小。所以每次发指令前先把上次真接收标志清零再配合rx_data_size双重验证才为成功接收。



    if(p->motoraddr == 1)
        rt_device_write(uart_dev6, 0, recive_angle_data1,8);
    else if(p->motoraddr == 2)
        rt_device_write(uart_dev6, 0, recive_angle_data2,8);
    else {
        rt_kprintf("file: motor.c\n" \
                   "funtion: %s\n" \
                   ": error paramter:motoraddr no exits",__func__);
    }

    rt_thread_delay(500);


    //if((rx_data_size == 0 || realrxflag == 0) && trytimes != 0)//没有数据返回且还有重试次数，重试
    if(realrxflag == 0 && trytimes != 0)//没有数据返回且还有重试次数，重试
    {
        trytimes--;
        rx_data_size=0;
        goto retry;
    }
    else if(realrxflag == 0 && trytimes == 0)//5次重试后，仍无数据返回，于是返回错误状态
    {
        rt_sem_release(&sem_send_instrction);
        return -1;
    }


//    rt_kprintf("%x ",rx_state_buffer[0]);
//    rt_kprintf("%x ",rx_state_buffer[1]);
//    rt_kprintf("%x ",rx_state_buffer[2]);
//    rt_kprintf("%x ",rx_state_buffer[3]);
//    rt_kprintf("%x ",rx_state_buffer[4]);
//    rt_kprintf("%x ",rx_state_buffer[5]);
//    rt_kprintf("%x ",rx_state_buffer[6]);
//    rt_kprintf("%x ",rx_state_buffer[7]);
//    rt_kprintf("%x ",rx_state_buffer[8]);
//    rt_kprintf("%x ",rx_state_buffer[9]);
//    rt_kprintf("%x\n",rx_state_buffer[10]);


    pos_hi = rx_state_buffer[5];
    pos_lo = rx_state_buffer[6];
    rt_sem_release(&sem_send_instrction);
    if(rx_state_buffer[4] == 1)
    {
        return -((pos_hi) << 8| pos_lo);
    }
    else{
        return ((pos_hi) << 8| pos_lo);
    }

}
