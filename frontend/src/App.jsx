import { useState } from 'react'
import {Routes, Route, Link} from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Global from '../pages/Global';
import MyMembers from '../pages/myMembers';
import Layout from '../components/layout';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/" element={<Layout />}>
        <Route path="/GlobalMembers" element={<Global />} />
        <Route path="/myMembers" element={<MyMembers />} />
      </Route>
      </Routes>
    </>
  )
}

export default App
