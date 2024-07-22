import {configureStore} from "@reduxjs/toolkit";
import {ContactsReducer} from "./slice.ts";



export const store = configureStore({

    reducer: {
        contacts:ContactsReducer,
    }

});



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;