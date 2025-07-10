################################################################################
# 自动生成的文件。不要编辑！
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/def.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/dhcp.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/dns.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/init.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/memp.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/netif.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/pbuf.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/raw.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/stats.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/sys.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_in.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_out.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/timers.c \
../rt-thread/components/net/lwip/lwip-1.4.1/src/core/udp.c 

OBJS += \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/def.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/dhcp.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/dns.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/init.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/memp.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/netif.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/pbuf.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/raw.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/stats.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/sys.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_in.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_out.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/timers.o \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/udp.o 

C_DEPS += \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/def.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/dhcp.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/dns.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/init.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/memp.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/netif.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/pbuf.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/raw.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/stats.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/sys.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_in.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/tcp_out.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/timers.d \
./rt-thread/components/net/lwip/lwip-1.4.1/src/core/udp.d 


# Each subdirectory must supply rules for building sources it contributes
rt-thread/components/net/lwip/lwip-1.4.1/src/core/%.o: ../rt-thread/components/net/lwip/lwip-1.4.1/src/core/%.c
	arm-none-eabi-gcc -mcpu=cortex-m7 -mthumb -mfloat-abi=hard -mfpu=fpv5-sp-d16 -O0 -ffunction-sections -fdata-sections -Wall  -g -gdwarf-2 -DSOC_FAMILY_STM32 -DSOC_SERIES_STM32H7 -DUSE_HAL_DRIVER -DSTM32H743xx -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include\config" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Device\ST\STM32H7xx\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\RTOS\Template" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc\Legacy" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\applications" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\dev_sign" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\infra" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\wrappers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\filesystems\devfs" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\finsh" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\common\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\newlib" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\poll" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\stdio" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\ipc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\ipv4" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\netif" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\port" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\netdev\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\dfs_net" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket\sys_socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\common" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\cortex-m7" -include"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rtconfig_preinc.h" -std=gnu11 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -c -o "$@" "$<"

