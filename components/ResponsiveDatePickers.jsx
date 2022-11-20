import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function ResponsiveDatePickers() {
  let today = new Date().toISOString().slice(0, 10);

  const [value1, setValue1] = React.useState(dayjs(today));
  const [value2, setValue2] = React.useState(dayjs(value1));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Check in"
          value={value1}
          minDate={dayjs(today)}
          onChange={(newValue) => {
            setValue1(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Check Out"
          value={value2}
          minDate={dayjs(value1)}
          onChange={(newValue) => {
            setValue2(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
