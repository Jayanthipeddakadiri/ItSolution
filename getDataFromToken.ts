import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
const getDataFromToken = (request: NextRequest) => {
  dotenv.config();
  try {
    const tokenCookie = request.cookies.get("token");
    if (tokenCookie) {
      const token = tokenCookie.value;
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      const decodedTokenId = decodedToken.id;
      return decodedTokenId;
    }
    return null;
  } catch (err: any) {
    console.error(err);
  }
};

export default getDataFromToken;
