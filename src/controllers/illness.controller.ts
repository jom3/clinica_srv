import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { Illness } from "../entities";
import { illnessCreateSchema, illnessUpdateSchema } from "../schemas/illness.schema";

const illnessRespository = AppDataSource.getRepository(Illness);

const getIllness = async (req: Request, res: Response) => {
  const illness = await illnessRespository.find();
  res.status(200).json(illness);
};

const getOneIllness = async (req: Request, res: Response) => {
  const { id } = req.body;
  const illness = await illnessRespository.findOneBy({ illness_id: id });
  if (!illness) {
    res.status(404).send({
      msg: `Illness with that id doesn't exist`,
    });
  }
  res.status(200).json(illness);
};

const postIllness = async (req: Request, res: Response) => {
  illnessCreateSchema
    .parseAsync(req.body)
    .then(async ({ name, desc }) => {
      const illness = illnessRespository.create({
        name: name.toLowerCase(),
        desc: desc?.toLowerCase(),
      });
      await illnessRespository.save(illness);
      res.status(201).json("Illness created");
    })
    .catch((error) => {
      if (error instanceof ZodError) {
        res
          .status(400)
          .send(error.issues.map((issue) => ({ message: issue.message })));
      }
    });
};

const patchIllness = async (req: Request, res: Response) => {
  const { id } = req.params;
  illnessUpdateSchema
    .parseAsync(req.body)
    .then(async ({ name, desc }) => {
      await illnessRespository.update(
        { illness_id: id },
        {
          name: name.toLowerCase(),
          desc: desc?.toLowerCase(),
        }
      );
      res.status(201).json("Illness updated");
    })
    .catch((error) => {
      if (error instanceof ZodError) {
        res
          .status(400)
          .send(error.issues.map((issue) => ({ message: issue.message })));
      }
    });
};

const removeIllness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const illness = await illnessRespository.findOneBy({ illness_id: id });
  if (illness?.status != 1) {
    res.status(400).send({
      msg: `Illness isn't active`,
    });
  }
  await illnessRespository.update({ illness_id: id }, { status: 0 });
  res.status(200).json("Illness is removed");
};

const restoreIllness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await illnessRespository.findOneBy({ illness_id: id });
  if (department?.status != 0) {
    res.status(400).send({
      msg: `Illness is active`,
    });
  }
  await illnessRespository.update({ illness_id: id }, { status: 1 });
  res.status(200).json("Illness is restore");
};

export { getIllness, getOneIllness, postIllness, patchIllness, removeIllness, restoreIllness }
