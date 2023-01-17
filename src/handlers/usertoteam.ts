import { STATUS } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import { deleteTeam } from "./team";

export const joinTeam = async (req: Request, res: Response) => {
  try {
    const team = await prisma.userToTeam.create({
      data: {
        user: { connect: { id: Number(req.body.user.id) } },
        team: { connect: { code: req.body.code } },
      },
      include: {
        team: true,
      },
    });
    res.json(team);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const leaveTeam = async (req: Request, res: Response) => {
  try {
    const t = await prisma.team.findFirst({
      where: {
        ownerId: Number(req.body.user.id),
        id: Number(req.params.teamId),
      },
    });
    if (t?.ownerId == Number(req.body.user.id)) {
      deleteTeam(req, res);
      return;
    }
    await prisma.task.updateMany({
      where: {
        assignedId: Number(req.body.user.id),
      },
      data: {
        assignedId: null,
        status: STATUS.NOT_ASSIGNED,
      },
    });
    await prisma.comment.deleteMany({
      where: {
        task: {
          teamId: Number(req.params.teamId),
        },
      },
    });
    await prisma.task.deleteMany({
      where: {
        authorId: Number(req.body.user.id),
      },
    });
    const team = await prisma.userToTeam.delete({
      where: {
        userId_teamId: {
          userId: Number(req.body.user.id),
          teamId: Number(req.params.teamId),
        },
      },
    });
    res.json(team);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.userToTeam.findMany({
      where: {
        teamId: Number(req.params.teamId),
      },
      include: {
        user: true,
      },
    });
    res.json(members);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};
