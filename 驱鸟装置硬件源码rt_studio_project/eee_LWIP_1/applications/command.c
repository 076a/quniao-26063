    /********************************************************
 * Function name     :   crc16_modbus
 * Description       :   进行CRC校验，并将校验结果放入输入数组的后两位
  *                                                 使用时请务必保证传入数组的大小至少有两位的冗余
  *                                                 如果输入数组后两位不为0，则代表进行CRC检验，
  *                                                 检验成功返回1，不成功返回0
 * Parameter         :
 * @data             :   存放发送数据的数组地址
 * @length           :   发送数据数组的长度（包含两位冗余位）
 * Return            :   无
**********************************************************/
void crc16_modbus(unsigned char *data, unsigned char length)
{
    int detection = 0;
    if ((data[length-2] == 0) && (data[length-1] == 0))
    {
        detection = 1;
        length -= 2;
    }
    unsigned short uCRC = 0xFFFF;             /* 初始值为0xFFFF */
    for(char num = 0; num < length; num++)
    {
        uCRC = (data[num]) ^ uCRC;      /* 把数据与16位的CRC寄存器的低8位相异或，结果存放于CRC寄存器。 */
        for(char x = 0; x < 8; x++)  /* 循环8次 */
        {
            if(uCRC & 0x0001)           /*判断最低位为：“1” */
            {
                uCRC = uCRC >> 1;       /* 先右移 */
                uCRC = uCRC ^ 0xA001;   /* 再与0xA001异或 */
            }
            else                        /* 判断最低位为：“0” */
            {
                uCRC = uCRC >> 1 ;      /* 右移 */
            }
        }
    }
    if (detection) {
        data[length] = uCRC & 0x00FF;            /* 取出CRC校验结果的低八位 */
        data[length+1] = (uCRC & 0xFF00) >> 8;     /* 取出CRC校验结果的高八位 */
    }

}

static void printCmd(unsigned char cmd[], int len,unsigned char* cmd_buffer){
    for(int i=0;i<len; i++)
        cmd_buffer[i]=cmd[i];
}

static void setCmd32(unsigned char motoraddr,unsigned char *data, unsigned int accSpeed,unsigned int decSpeed,unsigned int s, int p){

    data[0]=motoraddr; //电机地址

    if(p>=0){ //direction
        data[8] = 0x00;//CW
    }else{
        data[8] = 0x01;//CCW
    }

    data[10] = accSpeed&0x00ff;
    data[9] = (accSpeed>>8)&0x00ff;

    data[12] = decSpeed&0x00ff;
    data[11] = (decSpeed>>8)&0x00ff;

    s = s * 10;
    data[14] = s&0x00ff;  //低8位
    data[13] = (s>>8 )&0x00ff; //高8位
    if(p<0){
        p = -p;
    }

    if(p>=(82*800)&&p<=(160*800))
        data[18] = 0x01;//手册错了，当运动方向为CW时，相对运动是0x01
    else if (p>(160*800))
        data[18] = 0x02;

//  p = p * 300;    //*10*30
    data[16] = p&0xff;  //低8位
    data[15] = (p>>8 )&0xff; //高8位

}

//run with postion & accspeed & decspeed & topspeed
void adPoscmd32(unsigned char motoraddr,unsigned int accSpeed,unsigned int decSpeed,unsigned int speed,int pos,unsigned char*cmd_buffer){
    unsigned char dirPosCmd32[]={0x00,0x10,0x00,0xf6,0x00,0x07,0x0e,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
    int len = sizeof(dirPosCmd32);
//  unsigned short int speed = 100; //speed :rpm
//  unsigned short int pos = 90; //angle :degree
    if(motoraddr == 1)
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*310);//horizontal: 31:1  vertical: 80:1
    else if(motoraddr == 2){
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*800);//horizontal: 31:1  vertical: 80:1
    }
    else if(motoraddr == 3){
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*100);
    }
    else {
        rt_kprintf("motoraddr error\n");
    }
    crc16_modbus(dirPosCmd32, len);
    printCmd(dirPosCmd32,len,cmd_buffer);
}


void adPoscmd32_absolute(unsigned char motoraddr,unsigned int accSpeed,unsigned int decSpeed,unsigned int speed,int pos,unsigned char*cmd_buffer){
    unsigned char dirPosCmd32[]={0x00,0x10,0x00,0xf6,0x00,0x07,0x0e,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00};
    int len = sizeof(dirPosCmd32);
//  unsigned short int speed = 100; //speed :rpm
//  unsigned short int pos = 90; //angle :degree
    if(motoraddr == 1)
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*310);//horizontal: 31:1  vertical: 80:1
    else if(motoraddr == 2){
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*800);//horizontal: 31:1  vertical: 80:1
    }
    else if(motoraddr == 3){
        setCmd32(motoraddr,dirPosCmd32, accSpeed,decSpeed,speed, pos*100);
    }
    else {
        rt_kprintf("motoraddr error\n");
    }
    crc16_modbus(dirPosCmd32, len);
    printCmd(dirPosCmd32,len,cmd_buffer);
}

//stop command
void stopcmd33(char syn){ //syn :0,1
    unsigned char stopcmd33[]={0x01,0x10,0x00,0xfe,0x00,0x01,0x02,0x98,syn,0x00,0x00};
    int len = sizeof(stopcmd33);

    crc16_modbus(stopcmd33, len);
    //printCmd(stopcmd33,len);
}

void readPos18(){
    unsigned char readPos18[]={0x01,0x04,0x00,0x46,0x00,0x03,0x51,0xde};
    int len = sizeof(readPos18);
    //printCmd(readPos18,len);
}
