import { db } from "../config"
import { collection, addDoc } from "firebase/firestore";
import LogPayload from "../../models/LogPayload";

const postLog = async (payload: LogPayload) => await addDoc(collection(db, "logs"), { ...payload })

export { postLog }