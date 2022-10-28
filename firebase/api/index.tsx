import { db } from "../config"
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import LogPayload from "../../models/LogPayload";

const LOG_COLLECTION = "logs"

const postLog = async (payload: LogPayload) => await addDoc(collection(db, LOG_COLLECTION), { ...payload })

const getLogs = async () => {
    const { docs, empty } = await getDocs(collection(db, LOG_COLLECTION));
    return empty ? [] : docs.map((doc:DocumentData) => doc.data()) as LogPayload[]
}

export { postLog, getLogs }