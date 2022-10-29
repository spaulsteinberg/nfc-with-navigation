import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TableLog from "../../../models/TableLog";
import getAllLogs from "../effects/logEffects";

interface LogState {
    loading: boolean;
    data: TableLog[];
    error: string;
}

const initialState: LogState = {
    data: [],
    loading: false,
    error: ''
}

const logSlice = createSlice({
    name: "LogSlice",
    initialState,
    reducers: {
        addLog: (state, action:PayloadAction<TableLog>) => {
            state.data = [action.payload, ...state.data]
        },
        setLogs: (state, action:PayloadAction<TableLog[]>) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllLogs.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(getAllLogs.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message!
        })
    }
})

export const { addLog, setLogs } = logSlice.actions

export default logSlice.reducer