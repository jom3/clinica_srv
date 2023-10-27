import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { Auth, User } from "../entities";
import { PasswordGenerator } from "../helpers/password-generator";
import { EncryptPassword } from "../helpers/encrypt-password";
import { SendEmail } from "../helpers/send-email";

const userRepository = AppDataSource.getRepository(User);
const authRepository = AppDataSource.getRepository(Auth);

const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json(users);
};

const getUser =async (req: Request, res: Response) => {
  const { id }= req.body;
  const user = await userRepository.findOneBy({user_id:id});
  if(!user){
    res.status(404).send({
      msg:`User with that id doesn't exist`
    })
  }
  res.status(200).send(user)
}

const postUser = async (req: Request, res: Response) => {
  userCreateSchema
    .parseAsync(req.body)
    .then(
      async ({
        address,
        email,
        firts_name,
        last_name,
        ...rest
      }) => {
        const user = userRepository.create({
          firts_name: firts_name.toLowerCase(),
          last_name: last_name.toLowerCase(),
          address: address.toLowerCase(),
          email: email.toLowerCase(),
          ...rest
        });
        await userRepository.save(user).then(async(user)=>{
          const generatePassword = PasswordGenerator()
          SendEmail(`Your new password is: ${generatePassword}`,user)
          await authRepository.save(authRepository.create({
            user_id:user.user_id,
            username:user.email.toLowerCase(),
            password: EncryptPassword(generatePassword)
          }))
        });
        res.status(201).send('User created');
      }
    )
    .catch((error) => {
      if (error instanceof ZodError) {
        res.status(400).send(
          error.issues.map(
            (issue) => ({ message: issue.message })
          )
        );
      }
    });
};

const patchUser = async (req: Request, res: Response) => {
  const {id} =req.params;
  userUpdateSchema
  .parseAsync(req.body)
  .then(
    async ({
      address,
      firts_name,
      last_name,
      ...rest
    }) => {
      await userRepository.createQueryBuilder('user')
      .update({
        firts_name: firts_name.toLowerCase(),
          last_name: last_name.toLowerCase(),
          address: address.toLowerCase(),
          ...rest
      }).where("user_id=:id",{id})
      .execute()
      res.status(201).send('User updated');
    }
  )
  .catch((error) => {
    if (error instanceof ZodError) {
      res.status(400).send(
        error.issues.map(
          (issue) => ({ message: issue.message })
        )
      );
    }
  });
};

const removeUser = async (req: Request, res: Response) => {
  const { id }= req.params;
  const user = await userRepository.findOneBy({user_id:id});
  if(user?.status!=1){
    res.status(400).send({
      msg:`User isn't active`
    })
  }
  await userRepository.update({user_id:id},{status:0})
  res.status(200).send('User is removed')
};

const restoreUser = async (req: Request, res: Response) => {
  const { id }= req.params;
  const user = await userRepository.findOneBy({user_id:id});
  if(user?.status!=0){
    res.status(400).send({
      msg:`User is active`
    })
  }
  await userRepository.update({user_id:id},{status:1})
  res.status(200).send('User is restore')
};

export { getUsers, getUser, postUser, patchUser, removeUser, restoreUser };
