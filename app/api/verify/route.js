const { SiweMessage } = require("siwe");
import { withIronSessionApiRoute } from "iron-session/next";
import { IRON_OPTIONS } from "../../../utils/constants";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { message, signature, state } = await req.json();
    console.log("message is", message);
    console.log("signature is ", signature);
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
