import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LogPayload from "../../../models/LogPayload";
import getAllLogs from "../effects/logEffects";

interface LogState {
    loading: boolean;
    data: LogPayload[];
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

export default logSlice.reducer