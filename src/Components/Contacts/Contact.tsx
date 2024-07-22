import React, {useEffect} from 'react';
import "./contact.css"
import {AppDispatch} from "../../Redux/store/store.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../Redux/hooks.ts";
import {fetchContacts, selectContacts} from "../../Redux/store/slice.ts";

const Contact = () => {
    const dispatch:AppDispatch = useDispatch();
    const contacts = useAppSelector(selectContacts);

    useEffect(() => {
        dispatch(fetchContacts())
    }, [fetchContacts]);

    const Click = () => {
        console.log('hello')
    }
    return (
        <>
            {contacts.map(contact => (
                <div key={contact.id} className="card block-card mt-4 ms-auto me-auto" onClick={Click}>
                    <div className="d-flex">
                        <div className="block-img">
                            <img className="card-img-top" src={`${contact.img}`} alt="it not a picture here, sorry"/>
                        </div>
                        <div className="block-body-card">
                            <p className="card-text">{contact.name}</p>
                        </div>
                    </div>
                </div>
            ))}

        </>
    );
};

export default Contact;