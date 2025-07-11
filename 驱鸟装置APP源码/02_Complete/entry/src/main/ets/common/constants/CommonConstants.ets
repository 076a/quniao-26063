import relationalStore from '@ohos.data.relationalStore'
import { MemoTable } from 'ets/viewmodel/TableInterface'

export default class CommonConstants {
  // Rdb 数据库配置
  static readonly STORE_CONFIG: relationalStore.StoreConfig = {
    name: 'device_data.db',
    securityLevel: relationalStore.SecurityLevel.S1
    // 鸿蒙OS不支持在StoreConfig中设置version，移除此属性
  };

  // 数据库版本，单独定义
  static readonly DATABASE_VERSION: number = 2;

  // 确保数据库目录存在
  static readonly DATABASE_DIR: string = 'data/database';

  static readonly DEVICE_DATE_TABLE: MemoTable = {
    tableName: 'device_date',
    sqlCreate: `CREATE TABLE IF NOT EXISTS device_date (
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        description TEXT,
                        status TEXT,
                        Color TEXT,
                        intervalTime TEXT,
                        positionX TEXT,
                        positionY TEXT
                    )`,
    columns: ['id', 'name', 'description', 'status', 'Color', 'intervalTime', 'positionX', 'positionY']
  };

  // 添加本地存储的键名常量
  static readonly AUTO_MODE_KEY: string = 'autoModeState';

  static readonly RDB_TAG = '[Debug.Rdb]';
  static readonly TABLE_TAG = '[Debug.device_date]';
  static readonly INDEX_TAG = '[Debug.Index]';
}