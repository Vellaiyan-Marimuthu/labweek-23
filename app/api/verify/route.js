const { SiweMessage } = require("siwe");
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { message, signature, state } = await req.json();
  
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    if (fields.nonce !== state) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    } else {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }
  } catch (error) {
    console.log("error is ", error);

    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
