import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: any, hashPassword: any) => {
  return bcrypt.compare(password, hashPassword);
};

export const hashPassword = (password: any) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: any) => {
  const token = jwt.sign({ id: user.id }, "SUGUS");
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  const [, token] = bearer.split(" ");

  try {
    const user = jwt.verify(token, "SUGUS");
    req.body.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: "Not authorize" });
    return;
  }
};
