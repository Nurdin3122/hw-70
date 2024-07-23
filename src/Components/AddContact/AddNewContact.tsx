import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ContactMutation} from "../../type.ts";
import {fetchContacts, fetchOneContact, fetchPostContact, fetchPutContact} from "../../Redux/store/slice.ts";
import {AppDispatch} from "../../Redux/store/store.ts";

const emptyState:ContactMutation = {
    name:"",
    number:"",
    mail:"",
    img:"",
}


const AddNewContact = () => {
    const contact = useSelector(state => state.contacts.contact);
    const {id} = useParams();
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = contact ? {...contact.newContact} : emptyState;
    const [newContact, setNewContact] = useState<ContactMutation>(initialState);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneContact(id));
        }
    }, [id]);


    const onFormSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        await dispatch(fetchPutContact(newContact));
        await dispatch(fetchContacts());
        navigate('/');
    }



    const changeContactForm = (event: React.ChangeEvent<HTMLInputElement >) => {
        setNewContact((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    if (!contact || !contact.newContact) {
        return null;
    }
    return (
        <div>
                <h3 className="mt-5 mb-3">Edit Contact</h3>
                <p>{id}</p>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text"
                           className="form-control"
                           id="name" name="name"
                           value={newContact.name}
                           onChange={changeContactForm}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="mail"
                           name="mail"
                           aria-describedby="emailHelp"
                           value={newContact.mail}
                           onChange={changeContactForm}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone number</label>
                    <input type="number"
                           className="form-control"
                           id="number"
                           name="number"
                           value={newContact.number}
                           onChange={changeContactForm}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Photo</label>
                    <input type="text"
                           className="form-control"
                           id="img"
                           name="img"
                           value={newContact.img}
                           onChange={changeContactForm}
                    />
                </div>
                <div className="mb-3">
                    <p>Image:</p>
                    <img src={`${newContact.img}`} alt="#"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
};

export default AddNewContact;