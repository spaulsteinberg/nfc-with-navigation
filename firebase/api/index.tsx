import { db } from "../config"
import { collection, addDoc, getDocs, DocumentData, Timestamp } from "firebase/firestore";
import LogPayload from "../../models/LogPayload";
import TableLog from "../../models/TableLog";

const LOG_COLLECTION = "logs"

const postLog = async (payload: LogPayload) => await addDoc(collection(db, LOG_COLLECTION), { ...payload })

const getLogs = async () => {
    const { docs, empty } = await getDocs(collection(db, LOG_COLLECTION));
    return empty ? [] : docs.map((doc:DocumentData) => ({ ...doc.data(), date: new Date().toDateString() , id: doc.id })) as TableLog[]
}

export { postLog, getLogs }