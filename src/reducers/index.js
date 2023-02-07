import { combineReducers } from "redux";
import user from "./user";
import projects from "./projects";
import area from "./area";
import survey from "./survey";
import loading from './loader'

export default combineReducers({
  user,
  projects,
  area,
  survey,
  loading,
});
