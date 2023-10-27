import { genSaltSync, hashSync} from 'bcryptjs';

const salt = genSaltSync(10);

export const EncryptPassword = (pass:string) =>{
  const encryptedPassword = hashSync(pass,salt);
  return encryptedPassword;
}