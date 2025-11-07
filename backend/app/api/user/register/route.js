// Import tools //
import { NextResponse } from "next/server";
import { userCreate } from "../../../../validation/user";
import User from "../../../../models/user.js";
import { corsHeaders } from "../../../../lib/cors.js";

export const runtime = 'nodejs';

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders(),
    });
}

// Create get route to retrieve all users //
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
        return NextResponse.json({ error: "failed retrieving user" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}


// Create post route to register user //
export async function POST(req) {
    try{
const body = await req.json();

const parsed = userCreate.safeParse(body);

if(!parsed.success) {
    return NextResponse.json({ error: "Invalid data fields", message: parsed.error.format() }, { 
        status: 400,
        headers: corsHeaders(),
    });
}

const { full_name, email, password } = parsed.data;

const userRegister = await User.create({
    full_name,
    email: email.trim().toLowerCase(),
    password
    });

    return NextResponse.json(userRegister, { 
        status: 200,
        headers: corsHeaders(),
    });

    } catch (err) {
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "failed creating user" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export const dynamic = "force-dynamic";