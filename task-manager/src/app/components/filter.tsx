import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React from "react";

type FilterProps = {
  handleChange: (e: SelectChangeEvent) => void;
};
const Filter = ({ handleChange }: FilterProps) => {
  return (
    <Stack direction="row" className="items-center gap-x-3">
      <p className="text-black">Filter by:</p>
      <FormControl className="w-1/12">
        <InputLabel id="priority">Priority</InputLabel>
        <Select
          labelId="priority"
          id="priority"
          onChange={handleChange}
          label="Priority"
        //   value=""
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filter;
