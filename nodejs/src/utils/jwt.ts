import jwt, { SignOptions } from "jsonwebtoken";
interface payload {
  email: string;
  name: string;
}

export function createToken(email: string, name: string): string {
  const SECRET = process.env.JWT_SECRET as jwt.Secret;
  const payload: payload = { email, name };
  const options: SignOptions = { expiresIn: 60 * 60 };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token: string): payload {
  const SECRET = process.env.JWT_SECRET as jwt.Secret;
  return jwt.verify(token, SECRET) as payload;
}
