import jwt from "jsonwebtoken";

// Function to verify Access Token
const verifyAccessToken = async (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS_TOKEN);
    return { valid: true, decoded }; // return the payload if valid
  } catch (error) {
    return { valid: false, error: error.message }; // return error message if invalid
  }
};

export default verifyAccessToken;
