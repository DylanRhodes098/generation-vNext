import { NextResponse } from "next/server";
import User from "../../../models/user.js";
import { corsHeaders } from "../../../lib/cors.js";

export const runtime = 'nodejs';

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders(),
    });
}

export async function GET() {
    try{
const users = await User.findAll();
if (!users) {
    return NextResponse.json({ error: "can not find users" }, { 
        status: 400,
        headers: corsHeaders(),
    });
}

return NextResponse.json(users, { headers: corsHeaders() });

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "failed retrieving user" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export const dynamic = "force-dynamic";