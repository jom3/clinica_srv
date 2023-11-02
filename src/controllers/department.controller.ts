import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { Department } from "../entities";
import { ZodError } from "zod";
import { departmentCreateSchema, departmentUpdateSchema } from "../schemas/department.schema";

const departmentRespository = AppDataSource.getRepository(Department);

const getDeparments = async (req: Request, res: Response) => {
  const departments = await departmentRespository.find();
  res.status(200).json(departments);
};

const getDepartment =async (req: Request, res: Response) => {
  const { id }= req.body;
  const department = await departmentRespository.findOneBy({department_id:id});
  if(!department){
    res.status(404).send({
      msg:`Department with that id doesn't exist`
    })
  }
  res.status(200).send(department)
}

const postDepartment = async (req: Request, res: Response) => {
  departmentCreateSchema
    .parseAsync(req.body)
    .then(
      async ({
        name,
        desc
      }) => {
        const department = departmentRespository.create({
          name:name.toLowerCase(),
          desc:desc?.toLowerCase()
        })
        await departmentRespository.save(department);
        res.status(201).send('Department created');
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

const patchDepartment = async (req: Request, res: Response) => {
  const {id} =req.params;
  departmentUpdateSchema
  .parseAsync(req.body)
  .then(
    async ({
     name,
     desc
    }) => {
      await departmentRespository
      .update({ department_id:id},{
        name: name.toLowerCase(),
        desc:desc?.toLowerCase()
      })
      res.status(201).send('Department updated');
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

const removeDepartment = async (req: Request, res: Response) => {
  const { id }= req.params;
  const department = await departmentRespository.findOneBy({department_id:id});
  if(department?.status!=1){
    res.status(400).send({
      msg:`Department isn't active`
    })
  }
  await departmentRespository.update({department_id:id},{status:0})
  res.status(200).send('Department is removed')
};

const restoreDepartment = async (req: Request, res: Response) => {
  const { id }= req.params;
  const department = await departmentRespository.findOneBy({department_id:id});
  if(department?.status!=0){
    res.status(400).send({
      msg:`Department is active`
    })
  }
  await departmentRespository.update({department_id:id},{status:1})
  res.status(200).send('Department is restore')
};

export { getDeparments, getDepartment, postDepartment, patchDepartment, removeDepartment, restoreDepartment }