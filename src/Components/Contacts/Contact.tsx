import React, {useEffect} from 'react';
import "./contact.css"
import {AppDispatch} from "../../Redux/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../../Redux/hooks.ts";
import {fetchContacts, fetchOneContact, modalWindowBlock, selectContacts} from "../../Redux/store/slice.ts";
import Spinner from "../Spinner/Spinner.tsx";


const Contact = () => {
    const dispatch:AppDispatch = useDispatch();
    const contacts = useAppSelector(selectContacts);
    const loading = useSelector(state => state.contacts.loading);
    const modalLoading = useSelector(state => state.contacts.modalLoading);


    useEffect (() => {
        dispatch(fetchContacts())
    }, [fetchContacts]);

    const Click = async (id:string) => {
        await dispatch(fetchOneContact(id));
        await dispatch(modalWindowBlock(true));
    }



    return (
        <>
            {loading ? <Spinner/> : (
            contacts.map(contact => (
                    <div key={contact.id} className="card block-card mt-4 ms-auto me-auto" onClick={() => Click(contact.id)} style={{display: modalLoading ? "none": "block"}}>
                        <div className="d-flex">
                            <div className="block-img">
                                <img className="card-img-top" src={`${contact.newContact.img}`}
                                     alt="it not a picture here, sorry"/>
                            </div>
                            <div className="block-body-card">
                                <p className="card-text">{contact.newContact.name}</p>
                            </div>
                        </div>
                    </div>
            ))
            )
            }
        </>
    );
};

export default Contact;