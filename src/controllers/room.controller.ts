import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ZodError } from "zod";
import { Room } from "../entities/room.entity";
import { roomCreateSchema, roomUpdateSchema } from "../schemas/room.schema";

const roomRespository = AppDataSource.getRepository(Room);

const getRooms = async (req: Request, res: Response) => {
  const rooms = await roomRespository.find();
  res.status(200).json(rooms);
};

const getRoom =async (req: Request, res: Response) => {
  const { id }= req.body;
  const room = await roomRespository.findOneBy({room_id:id});
  if(!room){
    res.status(404).send({
      msg:`Room with that id doesn't exist`
    })
  }
  res.status(200).json(room)
}

const postRoom = async (req: Request, res: Response) => {
  roomCreateSchema
    .parseAsync(req.body)
    .then(
      async ({
        name,
        desc
      }) => {
        const room = roomRespository.create({
          name:name.toLowerCase(),
          desc:desc?.toLowerCase()
        })
        await roomRespository.save(room);
        res.status(201).json('Room created');
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

const patchRoom = async (req: Request, res: Response) => {
  const {id} =req.params;
  roomUpdateSchema
  .parseAsync(req.body)
  .then(
    async ({
     name,
     desc
    }) => {
      await roomRespository
      .update({ room_id:id},{
        name: name.toLowerCase(),
        desc:desc?.toLowerCase()
      })
      res.status(201).json('Room updated');
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

const removeRoom = async (req: Request, res: Response) => {
  const { id }= req.params;
  const room = await roomRespository.findOneBy({room_id:id});
  if(room?.status!=1){
    res.status(400).send({
      msg:`Room isn't active`
    })
  }
  await roomRespository.update({room_id:id},{status:0})
  res.status(200).json('Room is removed')
};

const restoreRoom = async (req: Request, res: Response) => {
  const { id }= req.params;
  const room = await roomRespository.findOneBy({room_id:id});
  if(room?.status!=0){
    res.status(400).send({
      msg:`Room is active`
    })
  }
  await roomRespository.update({room_id:id},{status:1})
  res.status(200).json('Room is restore')
};

export { getRooms, getRoom, postRoom, patchRoom, removeRoom, restoreRoom }