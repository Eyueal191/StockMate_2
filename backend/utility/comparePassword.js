import bcrypt from "bcrypt";
// Function to compare plain password with hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match; // true if match, false otherwise
};

export default comparePassword;
