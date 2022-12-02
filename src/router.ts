import { Router } from "express";
import { body, validationResult } from "express-validator";
import { deleteTask, getAllTasks, postTask, putTask } from "./handlers/task";
import {
  changeTeamName,
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
} from "./handlers/team";
import { joinTeam, leaveTeam } from "./handlers/usertoteam";

const router = Router();

// Task
router.get("/tasks/:teamId", getAllTasks);
router.put("/tasks/:teamId/:id", putTask);
router.post("/tasks/:teamId", postTask);
router.delete("tasks/:id", deleteTask);

// Team

router.get("/teams", getTeams);
router.get("/team:teamId", getTeam);
router.post("/teams/:teamId", changeTeamName);
router.put("/teams", createTeam);
router.delete("/teams/:teamId", deleteTeam);

//UserToTeam

router.post("/join", joinTeam);
router.get("/leave:teamId", leaveTeam);

export default router;
