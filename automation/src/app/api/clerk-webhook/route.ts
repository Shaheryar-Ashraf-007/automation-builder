import { db } from "../../../lib/db";

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id,email_address, first_name, imageurl } = body?.data;
        const email = email_address?.[0]?.email_address || "";
        console.log("Received webhook data:", body);

        await db.user.upsert({
            where: { clerkId: id },
            update:{
                email,
                name: first_name,
                profileImage: imageurl
            },

            create:{
                clerkId: id,
                email,
                name: first_name || "",
                profileImage: imageurl || "",
            }

        })

        return new NextResponse.json({ message: "User data processed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
        
    }
}