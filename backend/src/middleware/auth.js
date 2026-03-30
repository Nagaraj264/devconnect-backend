import { verifyAccessToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }

  req.user = decoded; 
  next();
};
