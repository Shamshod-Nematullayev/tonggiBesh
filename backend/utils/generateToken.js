import jwt from "jsonwebtoken";

function generateToken(userId, res) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "6h" }
  );
  res.cookie("Authorization", token, {
    maxAge: 1000 * 60 * 60 * 6,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
}

export default generateToken;
