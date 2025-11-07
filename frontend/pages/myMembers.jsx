import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout as logOut} from "../services/auth";
import { listGyms } from "../services/gym";
import { createGym } from "../services/gym";
import { listMembers } from "../services/member";
import { createMember, updateMember } from "../services/member";
import { listPtMembers } from "../services/ptMember";
import { createPtMember } from "../services/ptMember";
import { listTimeLine } from "../services/timeLine";
import { createTimeLine } from "../services/timeLine";
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { columns, mapPtMembersToTableData } from "../data/userTableData";
import { updatePtMember } from "../services/ptMember";

export default function MyMembers () {
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

     async function retrievePtMembers () {
        setErr("");
        try {
            const data = await listPtMembers();
            console.log("listPtMembers() result:", data);
            
            // Filter to only show ptMembers for the current logged-in user
            const currentUserId = sessionStorage.getItem('id');
            if (currentUserId && Array.isArray(data)) {
                const filteredData = data.filter(pm => pm.ptId === currentUserId);
                setPtMember(filteredData);
            } else {
                setPtMember(data || []);
            }
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing ptMembers" );
        }
     }

     async function handleUpdateNotes(ptMemberId, notes) {
        setErr("");
        try {
            await updatePtMember({
                id: ptMemberId,
                notes: notes,
            });
            // Refresh ptMembers list to show updated data
            await retrievePtMembers();
        } catch (error) {
            setErr(error?.response?.data?.error || "failed updating notes");
        }
     }

     useEffect (() => {
        (async () => {
            await retrieveGym();
            await retrievePtMembers();
        })(); 
    }, []);

     function warningMessage () {
        if (!err) {
            return null;
        } else {
            return <p style={{ color: "crimson" }}>{err}</p>
        }
     }

     const tableData = mapPtMembersToTableData(ptMember);

     return (
<>
{warningMessage()}
<Table 
className="m-4 w-full"
columns={columns(handleUpdateNotes)} 
dataSource={tableData}
pagination={{ pageSize: 10 }}
/>

</>

     )

}
