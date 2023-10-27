import jwt from 'jsonwebtoken';

export const GenerateJWT = (payload:string) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: {user_id:payload}
  }, <string>process.env.SECURITY_JWT_KEY);

  return token;
}