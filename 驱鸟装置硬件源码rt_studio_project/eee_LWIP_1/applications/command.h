#ifndef APPLICATIONS_COMMAND_H_
#define APPLICATIONS_COMMAND_H_

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
void crc16_modbus(unsigned char *data, unsigned char length);//生成校验码
void adPoscmd32(unsigned char motoraddr,unsigned int accSpeed,unsigned int decSpeed,unsigned int speed,int pos,unsigned char*cmd_buffer);
void adPoscmd32_absolute(unsigned char motoraddr,unsigned int accSpeed,unsigned int decSpeed,unsigned int speed,int pos,unsigned char*cmd_buffer);
//stop command
void stopcmd33(char syn);

void readPos18();
#endif /* APPLICATIONS_COMMAND_H_ */
