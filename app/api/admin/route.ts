import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(){
    return  NextResponse.json({message : "rota funcioando"},{status : 200})
}