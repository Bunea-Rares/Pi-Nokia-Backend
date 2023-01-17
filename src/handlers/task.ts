import { PRIORITY, STATUS } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
const isMember = async (req: Request) => {
  const userTeams = await prisma.userToTeam.findMany({
    where: { userId: Number(req.body.user.id) },
  });
  const teams: number[] = [];
  userTeams.forEach((obj) => teams.push(Number(obj["teamId"])));
  //make sure the user is member of the team that the task is assigned to
  return teams.includes(Number(req.params.teamId));
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    if (!isMember(req)) throw "You're not a member of this team";
    console.log(req.query);
    const tasks = await prisma.task.findMany({
      where: {
        teamId: Number(req.params.teamId),
        priority: req.query.priority
          ? req.query.priority !== "ALL" && req.query.priority
            ? (req.query.priority as PRIORITY)
            : undefined
          : undefined,
        status: req.query.status
          ? req.query.status !== "ALL" && req.query.status
            ? (req.query.status as STATUS)
            : undefined
          : undefined,
        authorId: req.query.author
          ? req.query.authorId !== "undefined" && req.query.priority
            ? Number(req.query.authorId)
            : undefined
          : undefined,
        assignedId: req.query.assignedId
          ? req.query.assignedId !== "undefined" && req.query.priority
            ? Number(req.query.assignedId)
            : undefined
          : undefined,
      },
      // take: 10,
      // cursor: {
      //   id: Number(req.query.cursor),
      // },
    });
    res.json({ tasks: tasks, cursor: tasks[tasks.length - 1]?.id });
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    if (!isMember(req)) throw "You're not a member of this team";
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        comments: true,
      },
    });
    res.json(task);
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    if (!isMember(req)) throw "You're not a member of this team";
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        priority: req.body.priority,
        description: req.body.description,
        author: {
          connect: { id: Number(req.body.user.id) },
        },
        status: req.body.status,
        team: {
          connect: { id: Number(req.params.teamId) },
        },
      },
    });
    res.json(task);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const modifyTask = async (req: Request, res: Response) => {
  try {
    if (!isMember(req)) throw "You're not a member of this team";
    if (req.body.assignedId === "NOT_ASSIGNED") {
      req.body.status = "NOT_ASSIGNED";
    }
    if (req.body.status === "NOT_ASSIGNED") {
      req.body.assignedId = "NOT_ASSIGNED";
    }
    const task = await prisma.task.update({
      where: {
        id_authorId: {
          id: Number(req.params.id),
          authorId: Number(req.body.authorId),
        },
      },
      data: {
        title: req.body.title ? req.body.title : undefined,
        priority: req.body.priority ? req.body.priority : undefined,
        description: req.body.description ? req.body.priority : undefined,
        assignedId:
          req.body.assignedId === "NOT_ASSIGNED"
            ? null
            : Number(req.body.assignedId),
        status: req.body.status ? (req.body.status as STATUS) : undefined,
      },
    });
    res.json(task);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!isMember(req)) throw "You're not a member of this team";
    await prisma.comment.deleteMany({
      where: {
        taskId: Number(req.params.id),
      },
    });
    const task = await prisma.task.delete({
      where: {
        id_authorId: {
          id: Number(req.params.id),
          authorId: Number(req.body.authorId),
        },
      },
    });
    res.json(task);
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};
