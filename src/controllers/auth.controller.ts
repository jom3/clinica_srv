import { Request, Response } from "express";
import { changePasswordSchema, loginSchema, recoverSchema } from "../schemas/auth.schema";
import { AppDataSource } from "../config/db.config";
import { Auth, User } from "../entities";
import { ZodError } from "zod";
import { compareSync } from 'bcryptjs';
import { EncryptPassword, PasswordGenerator, SendEmail, GenerateJWT } from "../helpers/helpers";

const authRepository = AppDataSource.getRepository(Auth);
const userRepository = AppDataSource.getRepository(User);

const login = async(req:Request, res:Response) => {
  try {
    const { password, username } = loginSchema.parse(req.body)
    const user = await authRepository.findOneBy({username:username});
    if(!user){
      res.status(404).send({
        msg:'Username does not exist'
      })
    }
    if(!compareSync(password, user!.password)){
      res.status(404).send({
        msg:'Password incorrect'
      })
    }
    const token = GenerateJWT(user!.user_id)

    res.status(200).send({token})

  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(
        error.issues.map(
          (issue) => ({ message: issue.message })
        )
      );
    }
  }
}

const changePassword = async(req:Request, res:Response) => {
  try {
    const {username, password} = changePasswordSchema.parse(req.body)
    const auth = await authRepository.findOneBy({username:username})
    if(!auth) {
      res.status(404).send({msg:`User with username: ${username} doesn't exist`})
    }
    await authRepository.update({username:username},{password:EncryptPassword(password)}).then(async()=>{
      res.status(200).send('Password changed')
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(
        error.issues.map(
          (issue) => ({ message: issue.message })
        )
      );
    }
  }
}

const recoverPassword = async(req:Request, res:Response) =>{
  try {
    const { username } = recoverSchema.parse(req.body);
    await authRepository.findOneBy({username:username}).then(async(auth)=>{
      if(!auth) {
        res.status(404).send({
          msg:`User with username: ${username} doesn't exist`
        })
      }
      await userRepository.findOneBy({user_id:auth!.user_id}).then(async(user)=>{
        const generatePassword = PasswordGenerator()
        SendEmail(`Your new password is: ${generatePassword}`,user!)
        await authRepository.update({user_id:auth!.user_id},{password:EncryptPassword(generatePassword)})
        res.status(200).send('Password recovered, check your email')
      })
    })


  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(
        error.issues.map(
          (issue) => ({ message: issue.message })
        )
      );
    }
  }
}

export { changePassword, login, recoverPassword }