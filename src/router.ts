import { Router } from "express";
import {
  deleteTask,
  getAllTasks,
  createTask,
  modifyTask,
} from "./handlers/task";
import {
  changeTeamName,
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
} from "./handlers/team";
import { joinTeam, leaveTeam } from "./handlers/usertoteam";

const router = Router();

// Task
router.get("/tasks/:teamId", getAllTasks);
router.put("/tasks/:teamId/:id", modifyTask);
router.post("/tasks/:teamId", createTask);
router.delete("tasks/:id", deleteTask);

// Team

router.get("/teams", getTeams);
router.get("/team:teamId", getTeamById);
router.post("/teams/:teamId", changeTeamName);
router.put("/teams", createTeam);
router.delete("/teams/:teamId", deleteTeam);

//UserToTeam

router.post("/join", joinTeam);
router.get("/leave:teamId", leaveTeam);

export default router;
