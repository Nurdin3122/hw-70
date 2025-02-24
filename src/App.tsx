
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./Container/Home/Home.tsx";
import Layout from "./Container/Layout/Layout.tsx";
import AddContact from "./Components/AddContact/AddContact.tsx";
import AddNewContact from "./Components/AddContact/AddNewContact.tsx";

const App = () => (
    <>
      <Layout>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/add-contact" element={<AddContact/>}/>
              <Route path="/add-new-contact/:id" element={<AddNewContact/>}/>
              <Route path="*" element={<h1>Sorry, there is not such pge</h1>}/>
          </Routes>
      </Layout>
    </>
);

export default App
