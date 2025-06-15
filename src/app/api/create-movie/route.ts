import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      "https://5hjl4oaz48.execute-api.ap-south-1.amazonaws.com/addMovie", // Your Lambda endpoint
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Add Movie API error:", error);
    return NextResponse.json(
      { message: "Failed to add movie" },
      { status: 500 }
    );
  }
}
