import { taskAction } from "@/redux/tasks-slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskObj } from "../../../types";
import { Check } from "@mui/icons-material";

type taskDialogProps = {
  open: boolean;
  handleClose: () => void;
  oldValue?: taskObj;
};
const TaskDialog = (props: taskDialogProps) => {
  const { open, handleClose, oldValue } = props;
  const dispatch = useDispatch();

  const title = oldValue ? "Update Task" : "Create Task";

  const [inputs, setInputs] = useState({
    id: oldValue ? oldValue.id : Date.now(), // Unique ID for each task,
    title: oldValue ? oldValue.title : "",
    priority: oldValue ? oldValue.priority : "low",
    completed: oldValue ? oldValue.completed : false,
  });

  //------------------------------------------------------------------------

  const handlePriorityChange = (
    event: React.MouseEvent<HTMLElement>,
    priority: string
  ) => {
    setInputs({ ...inputs, priority });
  };

  //------------------------------------------------------------------------

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(
      formData.entries()
    ) as unknown as taskObj;
    const newTask = {
      id: inputs.id,
      title: formJson.title,
      priority: inputs.priority,
      completed: inputs.completed,
    };

    // If we are updating call the update function
    if (oldValue) {
      dispatch(taskAction.editTask(newTask));
    } else {
      dispatch(taskAction.addTask(newTask));
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: submitHandler,
      }}
    >
      <DialogTitle className="font-bold">{title}</DialogTitle>
      <DialogContent className=" flex flex-col ">
        <p className="h-3"></p>
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          type="text"
          variant="outlined"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        />
        <label htmlFor="priority" className="mt-5 mb-1">
          Priority:
        </label>
        <ToggleButtonGroup
          fullWidth
          exclusive
          id="priority"
          color="primary"
          value={inputs.priority}
          onChange={handlePriorityChange}
        >
          <ToggleButton value="low">LOW</ToggleButton>
          <ToggleButton value="medium">MEDIUM</ToggleButton>
          <ToggleButton value="high">HIGH</ToggleButton>
        </ToggleButtonGroup>

        {oldValue && (
          <Stack
            direction="row"
            className="justify-center items-center mt-5 gap-x-3"
          >
            <p>Completed</p>
            <ToggleButton
              value={inputs.completed}
              color="success"
              selected={inputs.completed}
              onChange={() =>
                setInputs((prev) => ({ ...inputs, completed: !prev.completed }))
              }
            >
              <Check />
            </ToggleButton>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          className="font-bold"
          color="error"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button size="large" className="font-bold" type="submit">
          {oldValue ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
