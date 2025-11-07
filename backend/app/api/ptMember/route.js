import { NextResponse } from "next/server";
import PtMember from "../../../models/ptMember.js";
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
        const ptMembers = await PtMember.findAll();
        if (!ptMembers) {
            return NextResponse.json({ error: "cannot find ptMembers" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }
        return NextResponse.json(ptMembers, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed retrieving ptMembers" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { gymId, ptId, memberId, notes, status, lastContactedAt, nextActionAt } = body || {};

        if (!gymId || !ptId || !memberId) {
            return NextResponse.json({ error: "gymId, ptId and memberId are required" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }

        const created = await PtMember.create({
            gymId,
            ptId,
            memberId,
            notes: notes ?? null,
            status: status ?? "new",
            lastContactedAt: lastContactedAt ? new Date(lastContactedAt) : null,
            nextActionAt: nextActionAt ? new Date(nextActionAt) : null,
        });

        return NextResponse.json(created, { 
            status: 201,
            headers: corsHeaders(),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating ptMember" }, { 
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

        const ptMember = await PtMember.findByPk(id);
        if (!ptMember) {
            return NextResponse.json({ error: "ptMember not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        if (updates.lastContactedAt !== undefined) {
            updates.lastContactedAt = updates.lastContactedAt ? new Date(updates.lastContactedAt) : null;
        }
        if (updates.nextActionAt !== undefined) {
            updates.nextActionAt = updates.nextActionAt ? new Date(updates.nextActionAt) : null;
        }

        await ptMember.update(updates);
        return NextResponse.json(ptMember, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating ptMember" }, { 
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

        const deleted = await PtMember.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "ptMember not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        return NextResponse.json({ success: true }, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting ptMember" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export const dynamic = "force-dynamic";


