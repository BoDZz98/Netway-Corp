"use client";
import { Button, List, SelectChangeEvent, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect, useState } from "react";
import TaskDialog from "./components/task-dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import TaskItem from "./components/task-item";
import Filter from "./components/filter";
import { taskObj } from "../../types";

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [createDialog, setCreateDialog] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Array<taskObj>>();

  // To update the UI when a task id added, updated, deleted
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleClickOpen = () => setCreateDialog(true);
  const handleClose = () => setCreateDialog(false);

  const handleFilterChange = (e: SelectChangeEvent) => {
    if (e.target.value === "all") {
      setFilteredTasks(tasks);
      return;
    }
    const filterTasks = tasks.filter(
      (task) => task.priority === e.target.value
    );
    setFilteredTasks(filterTasks);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" className="justify-between w-1/2">
        <h1 className="text-cyan-500 text-3xl font-bold">Task Manager</h1>
        <Button
          variant="contained"
          className="text-2xl bg-cyan-500"
          size="large"
          endIcon={<AddBoxIcon />}
          onClick={handleClickOpen}
        >
          Add
        </Button>

        {/* Task Dialog------------------------------ */}
        <TaskDialog open={createDialog} handleClose={handleClose} />
      </Stack>

      <Filter handleChange={handleFilterChange} />

      {/* All tasks ---------------------------------------*/}
      <List>
        {filteredTasks &&
          filteredTasks.map((task) => <TaskItem task={task} key={task.id} />)}
        {filteredTasks && filteredTasks.length === 0 && (
          <p className="text-red-500 text-lg">No Tasks Available</p>
        )}
      </List>
    </Stack>
  );
}
