import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { Staff } from "../entities";
import { staffCreateSchema } from "../schemas/staff.schema";

const staffRespository = AppDataSource.getRepository(Staff);

const getStaffs = async (req: Request, res: Response) => {
  const staff = await staffRespository.find();
  res.status(200).json(staff);
};

const getStaff = async (req: Request, res: Response) => {
  const { id } = req.body;
  const staff = await staffRespository.findOneBy({ staff_id: id });
  if (!staff) {
    res.status(404).send({
      msg: `Staff with that id doesn't exist`,
    });
  }
  res.status(200).send(staff);
};

const postStaff = async (req: Request, res: Response) => {
  staffCreateSchema
    .parseAsync(req.body)
    .then(async ({ user_id, speciality_id, department_id }) => {
      const staff = staffRespository.create({
        user: user_id,
        speciality: speciality_id,
        department: department_id,
      });
      await staffRespository.save(staff);
      res.status(201).send("Staff created");
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof ZodError) {
        res
          .status(400)
          .send(error.issues.map((issue) => ({ message: issue.message })));
      }
    });
};

const patchStaff = async (req: Request, res: Response) => {
  const { id } = req.params;
  staffCreateSchema
    .parseAsync(req.body)
    .then(async ({ user_id, speciality_id, department_id }) => {
      console.log(id, user_id, speciality_id, department_id)
      await staffRespository.update(
        { staff_id: id },
        {
          user: user_id,
          speciality: speciality_id,
          department: department_id,
          updated_at: new Date()
        }
      );
      res.status(201).send("Staff updated");
    })
    .catch((error) => {
      if (error instanceof ZodError) {
        res
          .status(400)
          .send(error.issues.map((issue) => ({ message: issue.message })));
      }
    });
};

const removeStaff = async (req: Request, res: Response) => {
  const { id } = req.params;
  const staff = await staffRespository.findOneBy({ staff_id: id });
  if (staff?.status != 1) {
    res.status(400).send({
      msg: `Staff isn't active`,
    });
  }
  await staffRespository.update(
    { staff_id: id },
    { status: 0, finished_at: new Date() }
  );
  res.status(200).send("Staff is removed");
};

const restoreStaff = async (req: Request, res: Response) => {
  const { id } = req.params;
  const staff = await staffRespository.findOneBy({ staff_id: id });
  if (staff?.status != 0) {
    res.status(400).send({
      msg: `Staff is active`,
    });
  }
  await staffRespository.update(
    { staff_id: id },
    { status: 1, finished_at: null!, started_at: new Date() }
  );
  res.status(200).send("Staff is restore");
};

export { getStaffs, getStaff, postStaff, patchStaff, removeStaff, restoreStaff };
