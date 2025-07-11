################################################################################
# 自动生成的文件。不要编辑！
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../rt-thread/components/drivers/ipc/completion.c \
../rt-thread/components/drivers/ipc/dataqueue.c \
../rt-thread/components/drivers/ipc/pipe.c \
../rt-thread/components/drivers/ipc/ringblk_buf.c \
../rt-thread/components/drivers/ipc/ringbuffer.c \
../rt-thread/components/drivers/ipc/waitqueue.c \
../rt-thread/components/drivers/ipc/workqueue.c 

OBJS += \
./rt-thread/components/drivers/ipc/completion.o \
./rt-thread/components/drivers/ipc/dataqueue.o \
./rt-thread/components/drivers/ipc/pipe.o \
./rt-thread/components/drivers/ipc/ringblk_buf.o \
./rt-thread/components/drivers/ipc/ringbuffer.o \
./rt-thread/components/drivers/ipc/waitqueue.o \
./rt-thread/components/drivers/ipc/workqueue.o 

C_DEPS += \
./rt-thread/components/drivers/ipc/completion.d \
./rt-thread/components/drivers/ipc/dataqueue.d \
./rt-thread/components/drivers/ipc/pipe.d \
./rt-thread/components/drivers/ipc/ringblk_buf.d \
./rt-thread/components/drivers/ipc/ringbuffer.d \
./rt-thread/components/drivers/ipc/waitqueue.d \
./rt-thread/components/drivers/ipc/workqueue.d 


# Each subdirectory must supply rules for building sources it contributes
rt-thread/components/drivers/ipc/%.o: ../rt-thread/components/drivers/ipc/%.c
	arm-none-eabi-gcc -mcpu=cortex-m7 -mthumb -mfloat-abi=hard -mfpu=fpv5-sp-d16 -O0 -ffunction-sections -fdata-sections -Wall  -g -gdwarf-2 -DSOC_FAMILY_STM32 -DSOC_SERIES_STM32H7 -DUSE_HAL_DRIVER -DSTM32H743xx -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include\config" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Device\ST\STM32H7xx\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\RTOS\Template" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc\Legacy" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\applications" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\dev_sign" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\infra" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\wrappers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\filesystems\devfs" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\finsh" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\common\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\newlib" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\poll" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\stdio" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\ipc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\ipv4" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\netif" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\port" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\netdev\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\dfs_net" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket\sys_socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\common" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\cortex-m7" -include"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rtconfig_preinc.h" -std=gnu11 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -c -o "$@" "$<"

