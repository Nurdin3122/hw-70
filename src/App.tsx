
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./Container/Home/Home.tsx";
import Layout from "./Container/Layout/Layout.tsx";

const App = () => (
    <>
      <Layout>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="*" element={<h1>Sorry, there is not such pge</h1>}/>
          </Routes>
      </Layout>
    </>
);

export default App
