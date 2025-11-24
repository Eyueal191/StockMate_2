import bcrypt from "bcrypt";
// Function to hash a plain password
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};
export default hashPassword;
