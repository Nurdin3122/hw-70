import {Contact} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "./store.ts";
interface Contacts{
    contacts:Contact[];
    contact?:Contact | []
    loading:boolean;
    error:boolean;
    modalLoading:boolean;
}

const initialState:Contacts = {
    contacts:[],
    contact:[],
    loading:false,
    error:false,
    modalLoading:false,
}

export const fetchContacts = createAsyncThunk<Contact[]>(
    "contacts/fetchContacts",
    async () => {
        const response = await axiosApi.get<Contact[] | null>(`/contacts.json`);
        const contacts = Object.keys(response.data).map(id => ({
            ...response.data[id],
            id,
        }))
        return contacts ?? [];
    }
);

export const fetchOneContact = createAsyncThunk<Contact,string>(
    "contacts/fetchOneContact",
    async (id:string) => {
        const response = await axiosApi.get<Contact | null>(`/contacts/${id}.json`);
        if (response.data) {
            return { ...response.data, id  };
        } else {
            return console.log("No find");
        }
    }
);

export const fetchPostContact = createAsyncThunk(
    "contacts/fetchPost",
    async (newContact:string) => {
        const response = await axiosApi.post<Contact>('/contacts.json',{newContact});
        return response.data;
    }
)

export const fetchDeleteContact = createAsyncThunk<string,string>(
    "contacts/fetchDelete",
    async (id:string) => {
        await axiosApi.delete(`/contacts/${id}.json`);
        return id;
    }
)


const ContactSlice = createSlice<Contacts>({
    name:"contacts",
    initialState,
    reducers:{
        modalWindowBlock:(state:Contacts,action:PayloadAction<boolean>) => {
            state.modalLoading = action.payload
        },
    },
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


        builder.addCase(fetchOneContact.pending,(state) => {
            state.loading = true ;
            state.error = false;
        });
        builder.addCase(fetchOneContact.fulfilled,(state,action:PayloadAction<Contact>) => {
            state.loading = false;
            state.contact = action.payload

        })
        builder.addCase(fetchOneContact.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(fetchDeleteContact.pending,(state) => {
            state.loading = true ;
            state.error = false;
        });
        builder.addCase(fetchDeleteContact.fulfilled,(state,action:PayloadAction<string>) => {
            state.loading = false;
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        });
        builder.addCase(fetchDeleteContact.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(fetchPostContact.pending,(state) => {
            state.loading = true ;
            state.error = false;
        });
        builder.addCase(fetchPostContact.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(fetchPostContact.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const ContactsReducer = ContactSlice.reducer;
export const {modalWindowBlock} = ContactSlice.actions

export const selectContacts = (state:RootState) => state.contacts.contacts