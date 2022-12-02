import prisma from "../../src/db";
import { taskdata } from "./taskdata";
import { teamData } from "./teamdata";
import { userData } from "./userdata";
import { userToTeam } from "./usertoteam";
import { PRIORITY } from "@prisma/client";
import { STATUS } from "@prisma/client";

userData.forEach((data) =>
  prisma.user.create({
    data,
  })
);

teamData.forEach((data) =>
  prisma.team.create({
    data,
  })
);

userToTeam.forEach((data) => prisma.userToTeam.create({ data }));
taskdata.forEach((data) =>
  prisma.task.create({
    data: {
      title: data.description,
      description: data.description,
      authorId: data.authorId,
      teamId: data.teamId,
      priority: data.priority as PRIORITY,
      status: data.status as STATUS,
    },
  })
);
