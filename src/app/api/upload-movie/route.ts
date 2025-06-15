import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const base64Data = await req.text(); // read raw body (base64 string)

    const response = await axios.post(
      "https://5hjl4oaz48.execute-api.ap-south-1.amazonaws.com/uploadFile",
      base64Data,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Upload API error:", err);
    return NextResponse.json(
      { message: "Upload failed." },
      { status: 500 }
    );
  }
}
