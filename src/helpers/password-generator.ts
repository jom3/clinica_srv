import {generate} from 'generate-password-ts';

export const PasswordGenerator = () =>{
  const password = generate({
    length: 10,
    numbers: true,
    uppercase:true,
    lowercase:true,
  });
  return password;
}