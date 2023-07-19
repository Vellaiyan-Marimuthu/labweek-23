import { IRON_OPTIONS } from "@/utils/constants";
import { withIronSessionApiRoute } from "iron-session/next/dist";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      req.session.destroy();
      res.send({ ok: true });
      break;
    default:
      res.setHeader("Allw", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, IRON_OPTIONS);