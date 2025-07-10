import relationalStore from '@ohos.data.relationalStore';
import CommonConstants from '../constants/CommonConstants';
import Logger from 'ets/utils/Logger';

// 抽象的Rdb类，没有业务属性，可以基于这个类创建带有业务属性的一张或多张表

export default class Rdb {

  // 管理关系数据库(RDB)方法属性 类型是RdbStore 或 null
  private rdbStore: relationalStore.RdbStore | null = null;

  // 数据库表名称
  private tableName: string;

  // 创建SQLite表的语句字符串
  private sqlCreateTable: string;

  // 列名字段的数组
  private columns: Array<string>;

  // 实例化 Rdb 对象时，初始化表名、创建表的语句、列名字段的数组
  constructor(tableName: string, sqlCreateTable: string, columns: Array<string>) {
    this.tableName = tableName;
    this.sqlCreateTable = sqlCreateTable;
    this.columns = columns;
  }

  // 获取操作数据库RdbStore对象的方法，接收一个回调函数
  getRdbStore(callback: Function = () => {}) {
    // 如果 回调函数为空、或undefined 打印错误日志，退出方法
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() has no callback!');
      return;
    }

    // 如果属性rdbStore 不为空，说明操作对象已经初始化，打印日志，执行回调函数，退出方法
    if (this.rdbStore !== null) {
      Logger.info(CommonConstants.RDB_TAG, 'The rdbStore exists.');
      callback();
      return
    }

    // 执行到此处，说明回调函数不为空，且rdbStore尚未初始化
    // 获取上下文
    let context: Context = getContext(this) as Context;
    
    // 使用上下文对象，获取数据库操作对象
    relationalStore.getRdbStore(context, CommonConstants.STORE_CONFIG, (err, rdbStore) => {
      // 如果发生错误，打印日志，退出方法
      if (err) {
        Logger.error(CommonConstants.RDB_TAG, `getRdbStore() failed, err: ${err}`);
        return;
      }
      // 如果成功，打印日志，将rdbStore赋值给属性
      Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() finished.');
      this.rdbStore = rdbStore;
      // 执行创建表的方法
      this.executeSql(callback);
      
      // 检查并添加新列
      this.checkAndAddColumns(rdbStore);
    });
  }

  // 检查并添加新列
  private checkAndAddColumns(rdbStore: relationalStore.RdbStore) {
    if (!rdbStore) return;
    
    // 检查表结构，添加缺失的列
    const alterTableSql = [
      `ALTER TABLE ${this.tableName} ADD COLUMN autoMode INTEGER DEFAULT 0`,
      `ALTER TABLE ${this.tableName} ADD COLUMN intervalTime TEXT DEFAULT ""`,
      `ALTER TABLE ${this.tableName} ADD COLUMN positionX TEXT DEFAULT ""`,
      `ALTER TABLE ${this.tableName} ADD COLUMN positionY TEXT DEFAULT ""`
    ];
    
    // 逐个尝试添加列（如果列已存在会抛出错误，但我们可以忽略）
    alterTableSql.forEach(sql => {
      try {
        rdbStore.executeSql(sql, []);
        Logger.info(CommonConstants.RDB_TAG, `Added column: ${sql}`);
      } catch (error) {
        // 列可能已存在，忽略错误
        Logger.info(CommonConstants.RDB_TAG, `Column may already exist: ${error}`);
      }
    });
  }

  // 执行SQL语句创建表
  private executeSql(callback: Function) {
    if (this.rdbStore) {
      this.rdbStore.executeSql(this.sqlCreateTable, [], (err) => {
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `executeSql() failed, err: ${err}`);
          return;
        }
        Logger.info(CommonConstants.RDB_TAG, 'executeSql() finished.');
        callback();
      });
    } else {
      Logger.error(CommonConstants.RDB_TAG, 'executeSql() failed, rdbStore is null.');
    }
  }

  // 关闭数据库连接
  closeRdbStore() {
    if (this.rdbStore) {
      this.rdbStore.close();
      this.rdbStore = null;
      Logger.info(CommonConstants.RDB_TAG, 'RdbStore closed.');
    }
  }

  // 插入数据的方法，入参为表格的存储键值对，和回调函数
  insertData(data: relationalStore.ValuesBucket, callback: Function = () => {}) {
    // 如果回调函数为空、或undefined 打印错误日志，退出方法
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'insertData() has no callback!');
      return;
    }
    // 创建结果标识局部变量，默认为false
    let resFlag: boolean = false;
    // 创建存储键值对局部变量，默认为入参data
    const valueBucket: relationalStore.ValuesBucket = data;
    // 如果rdbStore存在则执行
    if (this.rdbStore) {
      try {
        // 开始事务
        this.rdbStore.beginTransaction();
        
        // 执行rdbStore的插入数据方法，入参为表名、存储键值对、异步回调函数
        this.rdbStore.insert(this.tableName, valueBucket, (err: Error | null, ret: number) => {
          if (err) {
            // 如果发生错误，回滚事务
            this.rdbStore?.rollBack();
            // 打印日志，执行入参的回调函数，并传入结果标识 false
            Logger.error(CommonConstants.RDB_TAG, `insertData() failed, err: ${err}`);
            callback(resFlag);
            return;
          }
          
          try {
            // 提交事务
            this.rdbStore?.commit();
            // 如果操作成功，打印日志，执行回调函数，并传入返回ret（行ID）
            Logger.info(CommonConstants.RDB_TAG, `insertData() finished: ${ret}`);
            callback(ret);
          } catch (commitErr) {
            // 提交事务失败，回滚事务
            this.rdbStore?.rollBack();
            Logger.error(CommonConstants.RDB_TAG, `Failed to commit transaction: ${commitErr}`);
            callback(resFlag);
          }
        });
      } catch (transactionErr) {
        // 开始事务失败
        Logger.error(CommonConstants.RDB_TAG, `Failed to begin transaction: ${transactionErr}`);
        callback(resFlag);
      }
    }
  }

  // 删除数据的方法，接收谓词和回调函数两个参数
  deleteData(predicates: relationalStore.RdbPredicates, callback: Function = () => {
  }) {
    // 如果回调函数为空、或undefined 打印错误日志，退出方法
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'deleteData() has no callback!');
      return;
    }
    // 创建结果标识局部变量，默认为false
    let resFlag: boolean = false;
    // 如果rdbStore存在则执行
    if (this.rdbStore) {
      // rdbStore的删除方法，入参为谓词、异步回调函数
      this.rdbStore.delete(predicates, (err, ret) => {
        // 如果发生错误，打印日志，执行入参的回调函数，并传入结果标识 false
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `deleteData() failed, err: ${err}`);
          callback(resFlag);
          return;
        }
        // 如果删除成功，打印日志，执行回调函数，并传入返回ret（行ID）
        Logger.info(CommonConstants.RDB_TAG, `deleteData() finished: ${ret}`);
        callback(!resFlag);
      });
    }
  }

  // 更新数据的方法，接收三个参数：谓词、存储键值对、回调函数
  updateData(predicates: relationalStore.RdbPredicates, data: relationalStore.ValuesBucket, callback: Function = () => {}) {
    // 如果回调函数为空、或undefined 打印错误日志，退出方法
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'updateDate() has no callback!');
      return;
    }
    // 创建结果标识局部变量，默认为false
    let resFlag: boolean = false;
    // 创建存储键值对局部变量，默认为入参data
    const valueBucket: relationalStore.ValuesBucket = data;
    // 如果rdbStore存在则执行
    if (this.rdbStore) {
      // rdbStore的更新方法，接收三个参数，存储键值对、谓词、回调函数
      this.rdbStore.update(valueBucket, predicates, (err: Error | null, ret: number) => {
        if (err) {
          // 如果发生错误，打印日志，执行入参的回调函数，并传入结果标识 false
          Logger.error(CommonConstants.RDB_TAG, `updateData() failed, err: ${err}`);
          callback(resFlag);
          return;
        }
        // 如果更新成功，打印日志，执行回调函数，并传入返回成功的标识 true
        Logger.info(CommonConstants.RDB_TAG, `updateData() finished: ${ret}`);
        callback(!resFlag);
      });
    }
  }

  // 查询数据的方法，接收两个参数，谓词、回调函数
  query(predicates: relationalStore.RdbPredicates, callback: Function = () => {
  }) {
    // 如果回调函数为空、或undefined 打印错误日志，退出方法
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'query() has no callback!');
      return;
    }
    // 如果rdbStore存在则执行
    if (this.rdbStore) {
      // rdbStore的查询方法，接收三个参数，谓词，数据库列名的数组，异步回调函数
      this.rdbStore.query(predicates, this.columns, (err: Error | null, resultSet: relationalStore.ResultSet) => {
        // 如果发生错误，打印日志，退出方法
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `query() failed, err:  ${err}`);
          return;
        }
        // 如果没有错误，打印日志
        Logger.info(CommonConstants.RDB_TAG, 'query() finished.');
        // 执行入参的回调函数，传入查询结果
        callback(resultSet);
        // 关闭结果集
        resultSet.close();
      });
    }
  }

}