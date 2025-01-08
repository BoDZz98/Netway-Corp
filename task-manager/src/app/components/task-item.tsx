import { taskAction } from "@/redux/tasks-slice";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskDialog from "./task-dialog";
import { taskObj } from "../../../types";

type TaskItemProps = {
  task: taskObj;
};
const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [updateDialog, setUpdateDialog] = useState(false);

  const handleClickOpen = () => setUpdateDialog(true);
  const handleClose = () => setUpdateDialog(false);

  const deleteHandler = async (taskId: number) => {
    dispatch(taskAction.deleteTask(taskId));
  };

  return (
    <div className="flex justify-between items-center w-1/2  my-3 p-3 rounded-lg border-2">
      <Stack className=" w-1/2">
        <p className="text-xl font-bold text-black">{task.title}</p>
        <p className=" ml-2 text-gray-400">Priority : {task.priority}</p>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        className="w-1/3 justify-end items-center "
      >
        {task.completed ? (
          <p className="text-green-500 text-lg w-1/2 ">Completed</p>
        ) : (
          <p className="text-red-500 text-lg w-1/2">Not completed</p>
        )}

        <IconButton
          color="error"
          onClick={() => deleteHandler(task.id)}
          size="large"
        >
          <Delete fontSize="large" />
        </IconButton>
        <IconButton onClick={() => handleClickOpen()} size="large">
          <Edit color="primary" fontSize="large" />
        </IconButton>

        {/* Update dialog------------------- */}
        <TaskDialog
          oldValue={task}
          open={updateDialog}
          handleClose={handleClose}
        />
      </Stack>
    </div>
  );
};

export default TaskItem;
