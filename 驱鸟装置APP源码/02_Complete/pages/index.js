import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const [isAutoOn, setIsAutoOn] = useState(false);

useEffect(() => {
    // 加载本地存储的自动开关状态
    const loadAutoState = async () => {
        try {
            const savedState = await AsyncStorage.getItem('autoSwitchState');
            if (savedState !== null) {
                setIsAutoOn(JSON.parse(savedState));
            }
        } catch (error) {
            console.log('加载自动开关状态失败:', error);
        }
    };

    loadAutoState();
}, []);

// 处理自动开关变化
const handleAutoSwitch = async (value) => {
    setIsAutoOn(value);
    try {
        await AsyncStorage.setItem('autoSwitchState', JSON.stringify(value));
    } catch (error) {
        console.log('保存自动开关状态失败:', error);
    }
}; 