import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout as logOut} from "../services/auth";
import { listGyms } from "../services/gym";
import { createGym } from "../services/gym";
import { listMembers } from "../services/member";
import { createMember } from "../services/member";
import { listPtMembers } from "../services/ptMember";
import { createPtMember } from "../services/ptMember";
import { listTimeLine } from "../services/timeLine";
import { createTimeLine } from "../services/timeLine";

export default function Home () {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [member, setMember] = useState([]);
    const [gym, setGym] = useState([]); 
    const [ptMember, setPtMember] = useState([]); 
    const [timeLine, setTimeline] = useState([]); 
    const [form, setForm] = useState(""); 

    async function retrieveGym () {
        setErr("");
        try {
            const data = await listGyms();
            setGym (data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing Gyms" );
        }
     }

     async function createGyms (e) {
        e.preventDefault();
        setErr("");
        try {
            const payload = { name, brand_theme_json };
            const data = await createGym(payload);
            setGym(existinggym => [...existinggym, data]);

        } catch (error) {
            setErr(error?.response?.data?.error || "failed creating Gym" );
        }
     }

     useEffect (() => {
        (async () => {
            await retrieveGym();
        })(); 
    }, []);

     function warningMessage () {
        if (!err) {
            return null;
        } else {
            return <p style={{ color: "crimson" }}>{err}</p>
        }
     }

     return (
<>

</>

     )

}
