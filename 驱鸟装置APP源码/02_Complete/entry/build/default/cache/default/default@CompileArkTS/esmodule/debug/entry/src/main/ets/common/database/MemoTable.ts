import relationalStore from "@ohos:data.relationalStore";
import DeviceDate from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceData";
import CommonConstants from "@bundle:com.example.pageanddata/entry/ets/common/constants/CommonConstants";
import Rdb from "@bundle:com.example.pageanddata/entry/ets/common/database/Rdb";
import Logger from "@bundle:com.example.pageanddata/entry/ets/utils/Logger";
// 设备数据的数据库类，基于Rdb类，有业务属性
export default class DeviceDateTable {
    // 将 deviceDateTable 改为 public，以便外部访问
    public deviceDateTable = new Rdb(CommonConstants.DEVICE_DATE_TABLE.tableName, CommonConstants.DEVICE_DATE_TABLE.sqlCreate, CommonConstants.DEVICE_DATE_TABLE.columns);
    // 构造函数，执行getRdbStore方法
    constructor(callback: Function = () => { }) {
        this.deviceDateTable.getRdbStore(callback);
    }
    // 通过deviceDateTable对象，执行原Rdb类中的getRdbStore方法，为deviceDateTable对象获取rdbStore操作对象
    getRdbStore(callback: Function = () => { }) {
        // 透传回调函数
        this.deviceDateTable.getRdbStore(callback);
    }
    // 插入数据的方法，接收单条DeviceDate对象，和回调函数
    insertData(deviceDate: DeviceDate, callback: Function) {
        Logger.info('MemoTable', `Inserting device with name: ${deviceDate.name}`);
        // 确保ID是唯一的
        if (!deviceDate.id || deviceDate.id <= 0) {
            // 如果没有ID或ID无效，生成一个新的唯一ID
            this.getMaxId((maxId: number) => {
                deviceDate.id = maxId + 1;
                Logger.info('MemoTable', `Generated new ID: ${deviceDate.id} for device: ${deviceDate.name}`);
                // 通过工具函数，将单条DeviceDate对象，转化为存储健值对
                const valueBucket: relationalStore.ValuesBucket = generateBucket(deviceDate);
                // 执行deviceDateTable的插入数据方法，透传回调函数
                this.deviceDateTable.insertData(valueBucket, (result: number | boolean) => {
                    Logger.info('MemoTable', `Insert result for device ${deviceDate.name}: ${result}`);
                    callback(result);
                });
            });
        }
        else {
            // 如果已有有效ID，直接插入
            const valueBucket: relationalStore.ValuesBucket = generateBucket(deviceDate);
            this.deviceDateTable.insertData(valueBucket, (result: number | boolean) => {
                Logger.info('MemoTable', `Insert result for device ${deviceDate.name}: ${result}`);
                callback(result);
            });
        }
    }
    // 获取最大ID的方法
    getMaxId(callback: Function) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.DEVICE_DATE_TABLE.tableName);
        this.deviceDateTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
            let maxId = 0;
            let count = resultSet.rowCount;
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    resultSet.goToRow(i);
                    let id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    if (id > maxId) {
                        maxId = id;
                    }
                }
            }
            Logger.info('MemoTable', `Current max ID: ${maxId}`);
            callback(maxId);
        });
    }
    // 删除数据的方法，接收单条DeviceDate对象，和回调函数
    deleteData(deviceDate: DeviceDate, callback: Function) {
        // 初始化操作数据库的谓词对象
        let predicates = new relationalStore.RdbPredicates(CommonConstants.DEVICE_DATE_TABLE.tableName);
        // 配置谓词以匹配数据表的id列中值的字段，为DeviceDate对象的id
        predicates.equalTo('id', deviceDate.id);
        // 使用谓词执行deviceDateTable的删除方法，透传回调函数
        this.deviceDateTable.deleteData(predicates, callback);
    }
    // 更新数据的方法，接收单条DeviceDate对象，和回调函数
    updateData(deviceDate: DeviceDate, callback: Function) {
        // 添加日志，记录传入的设备对象
        // 初始化操作数据库的谓词对象
        let predicates = new relationalStore.RdbPredicates(CommonConstants.DEVICE_DATE_TABLE.tableName);
        predicates.equalTo('id', deviceDate.id);
        // 直接使用传入的设备对象创建 ValuesBucket
        const valueBucket: relationalStore.ValuesBucket = {
            name: deviceDate.name,
            description: deviceDate.description,
            status: deviceDate.status,
            Color: deviceDate.Color,
            intervalTime: deviceDate.intervalTime || "",
            positionX: deviceDate.positionX || "",
            positionY: deviceDate.positionY || ""
        };
        // 添加日志，记录创建的 ValuesBucket
        Logger.info('MemoTable', `ValuesBucket for device ${deviceDate.id}, autoMode: ${valueBucket.autoMode}, type: ${typeof valueBucket.autoMode}`);
        // 执行deviceDateTable的更新数据方法
        this.deviceDateTable.updateData(predicates, valueBucket, (result: boolean) => {
            Logger.info('MemoTable', `Update result for device ${deviceDate.id}: ${result}`);
            callback(result);
        });
    }
    // 查询全部设备数据的方法
    query(callback: Function) {
        // 初始化操作数据库的谓词对象
        let predicates = new relationalStore.RdbPredicates(CommonConstants.DEVICE_DATE_TABLE.tableName);
        // 使用谓词执行deviceDateTable的查询方法
        this.deviceDateTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
            // 创建局部变量，存储结果的行数
            let count: number = resultSet.rowCount;
            // 创建局部变量，存储结果的数组
            let result: Array<DeviceDate> = [];
            // 如果查询的结果为0，执行回调函数，传入空数组
            if (count === 0 || typeof count === 'string') {
                Logger.info(CommonConstants.TABLE_TAG, 'Query no results.');
                callback(result);
            }
            else {
                // 如果有结果，将结果集指向第一行
                resultSet.goToFirstRow();
                // 循环遍历结果集
                for (let i = 0; i < count; i++) {
                    // 创建设备对象
                    let device = new DeviceDate(resultSet.getDouble(resultSet.getColumnIndex('id')), resultSet.getString(resultSet.getColumnIndex('name')), resultSet.getString(resultSet.getColumnIndex('description')), resultSet.getString(resultSet.getColumnIndex('status')), resultSet.getString(resultSet.getColumnIndex('Color')), resultSet.getString(resultSet.getColumnIndex('intervalTime')), resultSet.getString(resultSet.getColumnIndex('positionX')), resultSet.getString(resultSet.getColumnIndex('positionY')));
                    // 将设备对象添加到结果数组
                    result.push(device);
                    // 将结果集指向下一行
                    if (i < count - 1) {
                        resultSet.goToNextRow();
                    }
                }
                // 执行回调函数，把查询结果传入
                callback(result);
            }
        });
    }
    // 查询单个设备数据的方法
    queryById(id: number, callback: Function) {
        // 初始化操作数据库的谓词对象
        let predicates = new relationalStore.RdbPredicates(CommonConstants.DEVICE_DATE_TABLE.tableName);
        predicates.equalTo('id', id);
        // 使用谓词执行deviceDateTable的查询方法
        this.deviceDateTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
            // 创建局部变量，存储结果的行数
            let count: number = resultSet.rowCount;
            // 如果查询的结果为0，执行回调函数，传入null
            if (count === 0 || typeof count === 'string') {
                Logger.info(CommonConstants.TABLE_TAG, `Query no results for ID: ${id}`);
                callback(null);
            }
            else {
                // 如果有结果，将结果集指向第一行
                resultSet.goToFirstRow();
                // 创建设备对象
                let device = new DeviceDate(resultSet.getDouble(resultSet.getColumnIndex('id')), resultSet.getString(resultSet.getColumnIndex('name')), resultSet.getString(resultSet.getColumnIndex('description')), resultSet.getString(resultSet.getColumnIndex('status')), resultSet.getString(resultSet.getColumnIndex('Color')), resultSet.getString(resultSet.getColumnIndex('intervalTime')), resultSet.getString(resultSet.getColumnIndex('positionX')), resultSet.getString(resultSet.getColumnIndex('positionY')));
                // 执行回调函数，把查询结果传入
                callback(device);
            }
        });
    }
}
// 工具函数，将DeviceDate对象的数据结构，转化为存储键值对
function generateBucket(deviceDate: DeviceDate): relationalStore.ValuesBucket {
    let obj: relationalStore.ValuesBucket = {};
    obj.id = deviceDate.id;
    obj.name = deviceDate.name;
    obj.description = deviceDate.description;
    obj.status = deviceDate.status;
    obj.Color = deviceDate.Color;
    obj.intervalTime = deviceDate.intervalTime || "";
    obj.positionX = deviceDate.positionX || "";
    obj.positionY = deviceDate.positionY || "";
    return obj;
}
