import React from "react";
import {useState, useEffect} from "react";
import { listProfiles } from "../services/profile";
import { createProfiles } from "../services/profile";

export default function UserProfile () {
    const [err, setErr] = useState("");
        const [profile, setProfile] = useState([]);

     function logOutUser (e) {
         e.preventDefault();
         setErr("");
         try {
            logOut();
            navigate("/login", {replace: true} );
         } catch (error) {
             setErr(error?.response?.data?.error || "logOut failed" );
         }
     }

     async function retrieveProfile () {
             setErr("");
             try{
                 const data = await listProfiles();
                 setProfile(data);
             } catch (error) {
                 setErr(error?.response?.data?.error || "failed retriveing Profiles")
             }
          }

          async function createProfile (e) {
                  e.preventDefualt();
                  setErr("");
                  try {
                      const payload = {full_name, address, mobile_number, email, date_of_birth, linkedin, whatsapp, snapchat, tiktok};
                      const data = await createProfiles(payload);
                      setProfile(currentProfile => [...currentProfile, data]);
                  } catch (error) {
                      setErr(error?.response?.data?.error || "failed creating Profile");
                  }
               }

           useEffect (() => {
                  (async () => {
                      await retrieveGroups();
                      await retrieveProfile();
                  })(); 
              }, []);
            }