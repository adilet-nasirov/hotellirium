import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { FcLike } from "react-icons/fc";
import { BiLogOut, BiLogIn, BiTrip } from "react-icons/bi";
import { IoIosHelpCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { MenuIcon, UserCircleIcon, EnvelopeIcon } from "@heroicons/react/solid";
import { Avatar } from "@mui/material";
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  console.log(user);
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
      <div onClick={handleClick} className="cursor-pointer">
        {user ? (
          <div>
            <Avatar alt={user.displayName} src={user.photoURL} />
          </div>
        ) : (
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full ">
            <MenuIcon className="h-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>

          <Typography sx={{ p: 2 }}> Messages</Typography>
        </div>
        <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
          </svg>

          <Typography sx={{ p: 2 }}>Notifications</Typography>
        </div>
        <div className="flex items-center justify-start px-7 w-48 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
          <BiTrip size={24} />
          <Typography sx={{ p: 2 }}>Trips</Typography>
        </div>
        <div
          onClick={() => router.push("/wishlist")}
          className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
        >
          <FcLike size={24} />
          <Typography sx={{ p: 2 }}>Wishlist</Typography>
        </div>
        <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
          <MdManageAccounts size={24} />
          <Typography sx={{ p: 2 }}>Account</Typography>
        </div>
        <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
          <IoIosHelpCircle size={24} />
          <Typography sx={{ p: 2 }}>Help</Typography>
        </div>
        <div>
          {user ? (
            <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
              <BiLogOut size={24} />
              <Typography sx={{ p: 2 }} onClick={() => auth.signOut()}>
                Log out
              </Typography>
            </div>
          ) : (
            <div className="flex items-center justify-start px-7 w-52 space-x-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
              <BiLogIn size={24} />
              <Typography
                sx={{ p: 2 }}
                onClick={() => router.push("/auth/login")}
              >
                Sign in
              </Typography>
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
}
