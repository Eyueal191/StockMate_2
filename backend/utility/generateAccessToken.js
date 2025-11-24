import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
// Function to generate Access Token
const generateAccessToken = (userId) => {
  const accessToken = jwt.sign(
    { id: userId }, // payload
    process.env.SECRET_KEY_ACCESS_TOKEN, // secret from .env
    { expiresIn: "3d" } 
  );
  return accessToken;
};
export default generateAccessToken;
