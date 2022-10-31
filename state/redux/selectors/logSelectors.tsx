import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectLogs = (state:RootState) => state.logs.data

const logsByTableNumberSelector = (n:string) => createSelector(selectLogs, logs => logs.filter(l => l.tableNumber === n).reverse())

export { logsByTableNumberSelector }