import React, {useState} from 'react';
import {AppDispatch} from "../../Redux/store/store.ts";
import {useDispatch} from "react-redux";
import {ContactMutation} from "../../type.ts";
import {
    fetchContacts,
    fetchPostContact,
} from "../../Redux/store/slice.ts";
import {useNavigate} from "react-router-dom";



const emptyState:ContactMutation = {
    name:"",
    number:"",
    mail:"",
    img:"",
}

const AddContact = () => {
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [newContact, setNewContact] = useState<ContactMutation>(emptyState);


    const onFormSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        await dispatch(fetchPostContact(newContact));
        await dispatch(fetchContacts());
        navigate('/');
    }

    const changeContactForm = (event: React.ChangeEvent<HTMLInputElement >) => {
        setNewContact((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <>
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
                    <p className="form-text">your picture:</p>
                    <img src={`${newContact.img}`} alt="there is not a picture"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default AddContact;