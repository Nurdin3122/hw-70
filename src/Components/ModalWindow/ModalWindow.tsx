import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./modal.css"
import {AppDispatch} from "../../Redux/store/store.ts";
import {fetchDeleteContact, modalWindowBlock} from "../../Redux/store/slice.ts";
import {Link} from "react-router-dom";

const ModalWindow = () => {
    const dispatch:AppDispatch = useDispatch();
    const contact = useSelector(state => state.contacts.contact);
    const modalLoading = useSelector(state => state.contacts.modalLoading);


    const getOutOfModal = () => {
        dispatch(modalWindowBlock(false));
    }

    const DeleteContact =async (id:string) => {
        await dispatch(fetchDeleteContact(id))
        dispatch(modalWindowBlock(false));
    }

    if (!contact || !contact.newContact) {
        return null;
    }

    return (
        <>
                <div className="card block-card" style={{display: modalLoading ? "block" : "none"}}>
                    <div className="text-end me-3 mt-3">
                        <button type="button" className="btn btn-danger" onClick={getOutOfModal}>Exit</button>
                    </div>
                    <div className="block-img-modal">
                        <img src={`${contact.newContact.img}`} className="card-img-top" alt="#"/>
                    </div>
                    <div className="card-body">
                        <p>{contact.newContact.name}</p>
                        <p>{contact.newContact.mail}</p>
                        <p>{contact.newContact.number}</p>
                    </div>
                    <div className="card-footerl-footer mb-3">
                        <button type="button" className="btn btn-secondary me-3"
                                onClick={() => DeleteContact(contact.id)}>Delete
                        </button>
                        <Link to={`/add-new-contact/${contact.id}`} type="button" className="btn btn-primary">Edit</Link>
                    </div>
                </div>
        </>


    );
};

export default ModalWindow;