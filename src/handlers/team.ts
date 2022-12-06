import { Request, Response } from "express";
import prisma from "../db";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.userToTeam.findMany({
      where: {
        userId: Number(req.body.user.id),
      },
      include: {
        team: true,
      },
      take: 10,
      cursor: {
        id: Number(req.query.cursor),
      },
    });
    res.json({ teams, cursor: teams[teams.length - 1]?.id });
  } catch (e: any) {
    res.json(e);
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await prisma.userToTeam.findUnique({
      where: {
        id: Number(req.body.user.id),
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

export const createTeam = async (req: Request, res: Response) => {
  try {
    const userToTeam = await prisma.userToTeam.create({
      data: {
        user: {
          connect: { id: Number(req.body.user.id) },
        },
        team: {
          create: {
            name: req.body.name,
            owner: {
              connect: { id: Number(req.body.user.id) },
            },
          },
        },
      },
    });
    const team = await prisma.team.findUniqueOrThrow({
      where: {
        id: userToTeam.teamId,
      },
    });
    res.json(team);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const changeTeamName = async (req: Request, res: Response) => {
  try {
    const team = await prisma.team.update({
      where: {
        id_ownerId: {
          id: Number(req.params.teamId),
          ownerId: Number(req.body.user.id),
        },
      },
      data: {
        name: req.body.name ? req.body.name : undefined,
      },
    });
    res.json(team);
  } catch (e: any) {
    console.log(e);
    res.status(401);
    res.json(e);
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    await prisma.task.deleteMany({
      where: {
        teamId: Number(req.params.teamId),
      },
    });
    await prisma.userToTeam.deleteMany({
      where: {
        teamId: Number(req.params.teamId),
      },
    });
    const team = await prisma.team.delete({
      where: {
        id_ownerId: {
          id: Number(req.params.teamId),
          ownerId: Number(req.body.user.id),
        },
      },
    });
    res.json(team);
  } catch (e: any) {
    res.status(401);
    res.json(e);
  }
};
