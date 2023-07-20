import { NextResponse } from "next/server";

const { generateNonce } = require("siwe");

// export async function GET(req, res) {
//   try {
//     const nonce = generateNonce();
//     return NextResponse.json({ message: "ok", data: nonce }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error",
//         error,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


export async function GET(req, res) {
  try {
    const result = await fetch('https://locksmith.unlock-protocol.com/v2/auth/nonce', {})
    return result;
  } catch (error) {
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