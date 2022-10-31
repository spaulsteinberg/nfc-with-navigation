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
        },
        mergeLogs: (state, action:PayloadAction<TableLog[]>) => {
            state.data = [...state.data, ...action.payload].filter((value, index, self) => index === self.findIndex(t => t.id === value.id)).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
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

export const { addLog, setLogs, mergeLogs } = logSlice.actions

export default logSlice.reducer