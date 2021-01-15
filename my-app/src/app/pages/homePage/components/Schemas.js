import * as yup from "yup";

export const validationAddNewTask = yup.object({
  taskName: yup.string().required("Please write your task name"),
});
