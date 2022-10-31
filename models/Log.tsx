import { Timestamp } from "firebase/firestore";
import { TableStatus } from "../constants/TableStatus";

/**
* Base interface for Firebase logs
* @tableNumber Number of the table
* @buser Buser name
* @status Status of type TableStatus
* @date Server timestamp
*/
interface Log {
    tableNumber:string;
    buser:string;
    status:TableStatus;
    date:Timestamp|number;
}

export default Log