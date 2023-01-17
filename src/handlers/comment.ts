import { Request, Response } from "express";
import prisma from "../db";

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        message: req.body.message,
        task: {
          connect: {
            id: Number(req.params.id),
          },
        },
        author: {
          connect: {
            id: Number(req.body.user.id),
          },
        },
      },
    });
    res.json(comment);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId: Number(req.params.taskId),
      },
    });
    res.json(comments);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};
