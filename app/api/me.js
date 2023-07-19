import { IRON_OPTIONS } from "@/utils/constants";
import { withIronSessionApiRoute } from "iron-session/next/dist";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      res.send({ address: req.session.siwe?.address });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allwed`);
  }
};

export default withIronSessionApiRoute(handler, IRON_OPTIONS);
