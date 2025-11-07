import { NextResponse } from "next/server";
import Member from "../../../models/member.js";
import { corsHeaders } from "../../../lib/cors.js";

export const runtime = 'nodejs';

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders(),
    });
}

export async function GET() {
    try {
        const members = await Member.findAll();
        // findAll() returns an array, so we should return it even if empty
        return NextResponse.json(members || [], { headers: corsHeaders() });
    } catch (err) {
        console.error("Error retrieving members:", err);
        return NextResponse.json({ 
            error: "failed retrieving members",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { gymId, fullName, email, phone, joinDate, isActive } = body || {};

        if (!gymId || !fullName || !email) {
            return NextResponse.json({ error: "gymId, fullName and email are required" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }

        const created = await Member.create({
            gymId,
            fullName,
            email,
            phone: phone ?? null,
            joinDate: joinDate ? new Date(joinDate) : null,
            isActive: typeof isActive === "boolean" ? isActive : true,
        });

        return NextResponse.json(created, { 
            status: 201,
            headers: corsHeaders(),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating member" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }

        const member = await Member.findByPk(id);
        if (!member) {
            return NextResponse.json({ error: "member not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        // Normalize fields
        if (updates.joinDate !== undefined) {
            updates.joinDate = updates.joinDate ? new Date(updates.joinDate) : null;
        }

        await member.update(updates);
        return NextResponse.json(member, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating member" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id query param is required" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }

        const deleted = await Member.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "member not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        return NextResponse.json({ success: true }, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting member" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export const dynamic = "force-dynamic";


