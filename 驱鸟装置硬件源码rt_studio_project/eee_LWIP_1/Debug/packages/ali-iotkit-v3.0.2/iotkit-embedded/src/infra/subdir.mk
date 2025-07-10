################################################################################
# 自动生成的文件。不要编辑！
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_compat.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_defs.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_log.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_net.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_prt_nwk_payload.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_report.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_sha256.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_string.c \
../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_timer.c 

OBJS += \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_compat.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_defs.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_log.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_net.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_prt_nwk_payload.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_report.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_sha256.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_string.o \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_timer.o 

C_DEPS += \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_compat.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_defs.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_log.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_net.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_prt_nwk_payload.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_report.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_sha256.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_string.d \
./packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/infra_timer.d 


# Each subdirectory must supply rules for building sources it contributes
packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/%.o: ../packages/ali-iotkit-v3.0.2/iotkit-embedded/src/infra/%.c
	arm-none-eabi-gcc -mcpu=cortex-m7 -mthumb -mfloat-abi=hard -mfpu=fpv5-sp-d16 -O0 -ffunction-sections -fdata-sections -Wall  -g -gdwarf-2 -DSOC_FAMILY_STM32 -DSOC_SERIES_STM32H7 -DUSE_HAL_DRIVER -DSTM32H743xx -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\drivers\include\config" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Device\ST\STM32H7xx\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\Include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\CMSIS\RTOS\Template" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\libraries\STM32H7xx_HAL_Driver\Inc\Legacy" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\applications" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx\Inc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\cubemx" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\dev_sign" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\infra" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\src\mqtt" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\packages\ali-iotkit-v3.0.2\iotkit-embedded\wrappers" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\filesystems\devfs" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\dfs\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\drivers\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\finsh" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\common\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\compilers\newlib" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\poll" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\io\stdio" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\libc\posix\ipc" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\ipv4" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include\netif" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\lwip-1.4.1\src\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\lwip\port" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\netdev\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\impl" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\dfs_net" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket\sys_socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include\socket" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\components\net\sal\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\include" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\common" -I"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rt-thread\libcpu\arm\cortex-m7" -include"C:\Users\lzr\Downloads\eee_LWIP1\eee_LWIP_1\rtconfig_preinc.h" -std=gnu11 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -c -o "$@" "$<"

