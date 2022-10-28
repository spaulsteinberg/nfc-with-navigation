import { Timestamp } from "firebase/firestore";
import { TableStatus } from "../constants/TableStatus";

/**
* Class which contains the log to send to firebase
* @tableNumber Number of the table
* @buser Buser name
* @status Status of type TableStatus
* @date Server timestamp
*/
class LogPayload {
    tableNumber:string;
    buser:string;
    status:TableStatus;
    date:Timestamp;
    constructor(n:string, b:string, s:TableStatus) {
        this.tableNumber = n;
        this.buser = b;
        this.status = s;
        this.date = Timestamp.now()
    }
}

export default LogPayload