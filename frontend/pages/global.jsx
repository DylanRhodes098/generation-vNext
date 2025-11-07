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
import { columns, mapMembersToTableData } from "../data/globalTableData";

export default function Global () {
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

     async function retrieveMembers () {
        setErr("");
        try {
            const data = await listMembers();
            console.log("listMembers() result:", data);
            setMember (data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing members" );
        }
     }

     async function handleClaimMember(memberRecord) {
        setErr("");
        try {
            // Get current user ID from session
            const currentUserId = sessionStorage.getItem('id');
            if (!currentUserId) {
                setErr("You must be logged in to claim a member");
                return;
            }

            // For now, we'll just update the member's isActive status
            // When the rules are implemented, this will update status to "occupied" and set ptId
            const updatedMember = await updateMember({
                id: memberRecord.id,
                isActive: true,
            });

            // Create ptMember entry
            await createPtMember({
                gymId: memberRecord.gymId,
                ptId: currentUserId,
                memberId: memberRecord.id,
                notes: null,
                status: 'new',
            });

            // Refresh members list
            await retrieveMembers();
        } catch (error) {
            setErr(error?.response?.data?.error || "failed claiming member");
        }
     }

     useEffect (() => {
        (async () => {
            await retrieveGym();
            await retrieveMembers();
        })(); 
    }, []);

     function warningMessage () {
        if (!err) {
            return null;
        } else {
            return <p style={{ color: "crimson" }}>{err}</p>
        }
     }

     const tableData = mapMembersToTableData(member);

     return (
<>
{warningMessage()}
<Table 
className="m-4 w-full"
columns={columns(handleClaimMember)} 
dataSource={tableData}
pagination={{ pageSize: 10 }}
/>

</>

     )

}
