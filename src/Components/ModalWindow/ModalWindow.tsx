import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./modal.css"
import {AppDispatch} from "../../Redux/store/store.ts";
import {fetchDeleteContact, modalWindowBlock} from "../../Redux/store/slice.ts";

const ModalWindow = () => {
    const dispatch:AppDispatch = useDispatch();
    const contact = useSelector(state => state.contacts.contact);
    const modalLoading = useSelector(state => state.contacts.modalLoading);


    const getOutOfModal = () => {
        dispatch(modalWindowBlock(false));
    }

    const DeleteContact = (id:string) => {
        console.log(id)
        dispatch(fetchDeleteContact(id))
        dispatch(modalWindowBlock(false));
    }

    return (
        <>
            <div className="card block-card" style={{display: modalLoading ? "block" : "none"}}>
                <div className="text-end me-3 mt-3">
                    <button type="button" className="btn btn-danger" onClick={getOutOfModal}>Exit</button>
                </div>
                <div className="block-img-modal">
                    <img src={`${contact.img}`} className="card-img-top" alt="#"/>
                </div>
                <div className="card-body">
                    <p>{contact.name}</p>
                    <p>{contact.mail}</p>
                    <p>{contact.number}</p>
                </div>
                <div className="card-footerl-footer mb-3">
                    <button type="button" className="btn btn-secondary me-3" onClick={() => DeleteContact(contact.id)}>Delete</button>
                    <button type="button" className="btn btn-primary">Edit</button>
                </div>
            </div>
        </>


    );
};

export default ModalWindow;