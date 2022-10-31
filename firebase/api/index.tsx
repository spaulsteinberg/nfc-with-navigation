import { db } from "../config"
import { collection, addDoc, getDocs, DocumentData, orderBy, query, where } from "firebase/firestore";
import LogPayload from "../../models/LogPayload";
import TableLog from "../../models/TableLog";

const LOG_COLLECTION = "logs"

const postLog = async (payload: LogPayload) => await addDoc(collection(db, LOG_COLLECTION), { ...payload })

const getLogs = async (tableNumber:string = '') => {
    const { docs, empty } = tableNumber ? await getDocs(query(collection(db, LOG_COLLECTION), where("tableNumber", "==", tableNumber), orderBy("date", "asc"))) : await getDocs(query(collection(db, LOG_COLLECTION), orderBy("date", 'desc')));
    return empty ? [] : docs.map((doc:DocumentData) => ({ ...doc.data(), date: Date.parse(doc.data().date.toDate()), id: doc.id })) as TableLog[]
}

export { postLog, getLogs }