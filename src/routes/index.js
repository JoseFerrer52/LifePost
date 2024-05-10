import { Router } from "express";
import {
  createFormValidation,
  validate,
} from "../controllers/middleware/validations.js";
import {
  getindexControllers,
  getAddcontrollers,
} from "../controllers/getControllers.js";
import { postAddControllers } from "../controllers/postControllers.js";
import { cachedAsync } from "../utils/cachedAsync.js";

const router = Router();

process.on("unhandledRejection", (error) => {
  console.log(error);
});

router.get("/", getindexControllers);

router.get("/add", getAddcontrollers);

router.post(
  "/add",
  validate(createFormValidation),
  cachedAsync(postAddControllers)
);

export { router };
