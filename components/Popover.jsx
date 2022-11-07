import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <div
        onClick={handleClick}
        className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md"
      >
        <MenuIcon className="h-6 cursor-pointer" />
        <UserCircleIcon className="h-6 cursor-pointer" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>Messages</Typography>
        <Typography sx={{ p: 2 }}>Notifications</Typography>
        <Typography sx={{ p: 2 }}>Trips</Typography>
        <Typography sx={{ p: 2 }}>Wishlist</Typography>
        <Typography sx={{ p: 2 }}>Account</Typography>
        <Typography sx={{ p: 2 }}>Help</Typography>
        <Typography sx={{ p: 2 }}>Log out</Typography>
      </Popover>
    </div>
  );
}
