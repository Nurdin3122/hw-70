import React from 'react';
import Contacts from "../../Components/Contacts/Contacts.tsx";
import ModalWindow from "../../Components/ModalWindow/ModalWindow.tsx";

const Home = () => {
    return (
        <>
            <h1 className="mt-5">My contacts</h1>
            <Contacts/>
            <ModalWindow/>
        </>
    );
};

export default Home;