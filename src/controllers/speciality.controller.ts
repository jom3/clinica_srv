import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { Speciality } from "../entities";
import { specialityCreateSchema, specialityUpdateSchema } from "../schemas/speciality.schema";

const specialityRespository = AppDataSource.getRepository(Speciality);

const getSpecialities = async (req: Request, res: Response) => {
  const specialities = await specialityRespository.find();
  res.status(200).json(specialities);
};

const getSpeciality =async (req: Request, res: Response) => {
  const { id }= req.body;
  const speciality = await specialityRespository.findOneBy({speciality_id:id});
  if(!speciality){
    res.status(404).send({
      msg:`Speciality with that id doesn't exist`
    })
  }
  res.status(200).send(speciality)
}

const postSpeciality = async (req: Request, res: Response) => {
  specialityCreateSchema
    .parseAsync(req.body)
    .then(
      async ({
        name,
        desc
      }) => {
        const speciality = specialityRespository.create({
          name:name.toLowerCase(),
          desc:desc?.toLowerCase()
        })
        await specialityRespository.save(speciality);
        res.status(201).send('Speciality created');
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

const patchSpeciality = async (req: Request, res: Response) => {
  const {id} =req.params;
  specialityUpdateSchema
  .parseAsync(req.body)
  .then(
    async ({
     name,
     desc
    }) => {
      await specialityRespository
      .update({ speciality_id:id},{
        name: name.toLowerCase(),
        desc:desc?.toLowerCase()
      })
      res.status(201).send('Speciality updated');
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

const removeSpeciality = async (req: Request, res: Response) => {
  const { id }= req.params;
  const speciality = await specialityRespository.findOneBy({speciality_id:id});
  if(speciality?.status!=1){
    res.status(400).send({
      msg:`Speciality isn't active`
    })
  }
  await specialityRespository.update({speciality_id:id},{status:0})
  res.status(200).send('Speciality is removed')
};

const restoreSpeciality = async (req: Request, res: Response) => {
  const { id }= req.params;
  const speciality = await specialityRespository.findOneBy({speciality_id:id});
  if(speciality?.status!=0){
    res.status(400).send({
      msg:`Speciality is active`
    })
  }
  await specialityRespository.update({speciality_id:id},{status:1})
  res.status(200).send('Speciality is restore')
};

export { getSpecialities, getSpeciality, postSpeciality, patchSpeciality, removeSpeciality, restoreSpeciality}