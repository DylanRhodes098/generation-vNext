import { useState } from 'react'
import './App.css'
import {Routes, Route, Link} from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from '../pages/Home';
import Layout from '../components/layout';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      </Routes>
    </>
  )
}

export default App
