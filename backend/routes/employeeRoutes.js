import express from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, calculateTax } from "../controllers/employeeController";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/tax/calculate", calculateTax);

export default router;
