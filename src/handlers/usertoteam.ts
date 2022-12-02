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
      },
    });
    const team = await prisma.userToTeam.delete({
      where: {
        userId_teamId: {
          userId: Number(req.body.user.id),
          teamId: Number(req.body.teamId),
        },
      },
    });
    res.json(team);
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};
