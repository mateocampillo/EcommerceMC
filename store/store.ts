import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./features/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch:()=>AppDispatch = useDispatch;

export const useAppSelector :TypedUseSelectorHook<Rootstate> = useSelector;