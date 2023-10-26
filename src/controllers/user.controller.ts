import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";

const userRepository = AppDataSource.getRepository(User);

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
        await userRepository.save(user);
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
