import React from 'react';

const AddContact = () => {

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone number</label>
                    <input type="number" className="form-control" id="number" name="number"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Photo</label>
                    <input type="text" className="form-control" id="photo" name="photo"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default AddContact;