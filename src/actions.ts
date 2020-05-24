import { createAction } from "@reduxjs/toolkit";

export const deleteHabit = createAction<string>("habit/deleteHabit");
