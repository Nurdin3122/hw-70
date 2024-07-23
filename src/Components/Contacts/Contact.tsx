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


    useEffect(() => {
        dispatch(fetchContacts())
    }, [fetchContacts]);

    const Click = (id:string) => {
        dispatch(fetchOneContact(id));
        dispatch(modalWindowBlock(true));
    }
    return (
        <>
            {contacts.map(contact => (
                loading ? <Spinner key={contact.id}/> : (
                    <div key={contact.id} className="card block-card mt-4 ms-auto me-auto" onClick={() => Click(contact.id)} style={{display: modalLoading ? "none": "block"}}>
                        <div className="d-flex">
                            <div className="block-img">
                                <img className="card-img-top" src={`${contact.img}`}
                                     alt="it not a picture here, sorry"/>
                            </div>
                            <div className="block-body-card">
                                <p className="card-text">{contact.name}</p>
                            </div>
                        </div>
                    </div>
                )
            ))}

        </>
    );
};

export default Contact;