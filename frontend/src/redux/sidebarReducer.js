import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = { value: true };

export const open = createAction("sidebar/open");
export const close = createAction("sidebar/close");
export const toggle = createAction("sidebar/toggle");

const sidebarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(open, (state) => {
      state.value = true;
    })
    .addCase(close, (state) => {
      state.value = false;
    })
    .addCase(toggle, (state) => {
      state.value = !state.value;
    });
});

export default sidebarReducer;
