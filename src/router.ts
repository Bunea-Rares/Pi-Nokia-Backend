import { Router } from "express";
import { addComment, getComments } from "./handlers/comment";
import { body, query, param } from "express-validator";
import {
  deleteTask,
  getAllTasks,
  createTask,
  modifyTask,
  getTask,
} from "./handlers/task";
import {
  changeTeamName,
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
} from "./handlers/team";
import { getTeamMembers, joinTeam, leaveTeam } from "./handlers/usertoteam";

const router = Router();

// Task
router.get("/teams/:teamId/tasks", getAllTasks);
router.get("/teams/:teamId/tasks/:id", getTask);
router.put("/teams/:teamId/tasks/:id", modifyTask);
router.post("/teams/:teamId/tasks", createTask);
router.delete("/teams/:teamId/tasks/:id", deleteTask);
router.post("/teams/:teamId/tasks/:id/addcomment", addComment);
// Task
router.get("/teams/:teamId/tasks/:taskId/getcomments", getComments);
// Team
router.get("/teams", getTeams);
router.get("/teams/:teamId", param("teamId").isInt(), getTeamById);
// router.post("/teams/:teamId", changeTeamName);
router.post("/teams", createTeam);
router.delete("/teams/:teamId", param("teamId").isInt(), deleteTeam);

//UserToTeam

router.post("/join", joinTeam);
router.post("/teams/:teamId/leave", leaveTeam);
router.get("/teams/:teamId/members", getTeamMembers);

export default router;
