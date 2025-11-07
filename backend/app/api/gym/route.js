import { NextResponse } from "next/server";
import Gym from "../../../models/gym.js";
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
        const gyms = await Gym.findAll();
        // findAll() returns an array, so we should return it even if empty
        return NextResponse.json(gyms || [], { headers: corsHeaders() });
    } catch (err) {
        console.error("Error retrieving gyms:", err);
        return NextResponse.json({ 
            error: "failed retrieving gyms",
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
        const { name, brand_theme_json } = body || {};

        if (!name) {
            return NextResponse.json({ error: "name is required" }, { 
                status: 400,
                headers: corsHeaders(),
            });
        }

        const created = await Gym.create({
            name,
            brand_theme_json: brand_theme_json ?? null,
        });

        return NextResponse.json(created, { 
            status: 201,
            headers: corsHeaders(),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating gym" }, { 
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

        const gym = await Gym.findByPk(id);
        if (!gym) {
            return NextResponse.json({ error: "gym not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        await gym.update(updates);
        return NextResponse.json(gym, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating gym" }, { 
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

        const deleted = await Gym.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "gym not found" }, { 
                status: 404,
                headers: corsHeaders(),
            });
        }

        return NextResponse.json({ success: true }, { headers: corsHeaders() });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting gym" }, { 
            status: 400,
            headers: corsHeaders(),
        });
    }
}

export const dynamic = "force-dynamic";


