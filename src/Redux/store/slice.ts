import {Contact} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "./store.ts";


interface Contacts{
    contacts:Contact[];
    loading:boolean;
    error:boolean;
}

const initialState:Contacts = {
    contacts:[],
    loading:false,
    error:false,
}

export const fetchContacts = createAsyncThunk<Contact[]>(
    "contacts/fetchContacts",
    async () => {
        const response = await axiosApi.get<Contact[]>(`/contacts.json`);
        const contacts = Object.keys(response.data).map(id => ({
            ...response.data[id],
            id,
        }))
        console.log(contacts)
        return contacts ?? [];
    }

)


const ContactSlice = createSlice<Contacts>({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchContacts.fulfilled,(state,action:PayloadAction<Contact[]>) => {
            state.loading = false;
            state.contacts = action.payload;
        });
        builder.addCase(fetchContacts.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const ContactsReducer = ContactSlice.reducer;
export const {} = ContactSlice.actions

export const selectContacts = (state:RootState) => state.contacts.contacts