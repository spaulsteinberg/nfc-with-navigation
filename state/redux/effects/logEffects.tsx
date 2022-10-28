import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLogs } from "../../../firebase/api";


const getAllLogs = createAsyncThunk(
    "get/Logs",
    async (_, { rejectWithValue }) => {
        try {
            const logs = await getLogs()
            return logs
        } catch (err) {
            console.log(err)
            return rejectWithValue("Could not fetch logs.")
        }
    }
)

export default getAllLogs