import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { Attention } from "../entities/attention.entity";
import { attentionCreateSchema, attentionUpdateSchema } from "../schemas/attention.schema";

const attentionRespository = AppDataSource.getRepository(Attention);

const getAttentions = async (req: Request, res: Response) => {
  const attentions = await attentionRespository.find();
  res.status(200).json(attentions);
};

const getAttention =async (req: Request, res: Response) => {
  const { id }= req.body;
  const attention = await attentionRespository.findOneBy({attention_id:id});
  if(!attention){
    res.status(404).send({
      msg:`Attention with that id doesn't exist`
    })
  }
  res.status(200).json(attention)
}

const postAttention = async (req: Request, res: Response) => {
  attentionCreateSchema
    .parseAsync(req.body)
    .then(
      async ({
        staff_id,
        user_id
      }) => {
        const attention = attentionRespository.create({
          staff:staff_id,
          user:user_id,
          create_at:new Date()
        })
        await attentionRespository.save(attention);
        res.status(201).json('Attention created');
      }
    )
    .catch((error) => {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(
          error.issues.map(
            (issue) => ({ message: issue.message })
          )
        );
      }
    });
};

const patchAttention = async (req: Request, res: Response) => {
  const {id} =req.params;
  attentionUpdateSchema
    .parseAsync(req.body)
    .then(
      async ({
        staff_id,
        user_id
      }) => {
        const attention = attentionRespository.create({
          staff:staff_id,
          user:user_id
        })
        await attentionRespository.save(attention);
        res.status(201).json('Attention updated');
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

const removeAttention = async (req: Request, res: Response) => {
  const { id }= req.params;
  const attention = await attentionRespository.findOneBy({attention_id:id});
  if(attention?.status!=1){
    res.status(400).send({
      msg:`Attention isn't active`
    })
  }
  await attentionRespository.update({attention_id:id},{status:0})
  res.status(200).json('Attention is removed')
};

const serveAttention = async (req: Request, res: Response) => {
  const { id }= req.params;
  const attention = await attentionRespository.findOneBy({attention_id:id});
  if(attention?.status!=1){
    res.status(400).send({
      msg:`Attention isn't active`
    })
  }
  await attentionRespository.update({attention_id:id},{status:2})
  res.status(200).json('Attention was served')
};

const restoreAttention = async (req: Request, res: Response) => {
  const { id }= req.params;
  const attention = await attentionRespository.findOneBy({attention_id:id});
  if(attention?.status!=0){
    res.status(400).send({
      msg:`Attention is active`
    })
  }
  await attentionRespository.update({attention_id:id},{status:1})
  res.status(200).json('Attention is restore')
};

export { getAttentions, getAttention, postAttention, patchAttention, removeAttention, restoreAttention, serveAttention }