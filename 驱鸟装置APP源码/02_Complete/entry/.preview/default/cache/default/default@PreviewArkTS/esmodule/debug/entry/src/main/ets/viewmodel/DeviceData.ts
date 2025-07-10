@Observed
class DeviceDate {
    id: number;
    name: string;
    description: string;
    status: string;
    Color: string;
    intervalTime: string;
    positionX: string;
    positionY: string;
    constructor(id: number, name: string, description: string, status: string = '', Color: string = '#000000', intervalTime: string = "", positionX: string = "", positionY: string = "") {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.Color = Color;
        this.intervalTime = intervalTime || "";
        this.positionX = positionX || "";
        this.positionY = positionY || "";
    }
}
export default DeviceDate;
