'use client'
import IconButton from "@mui/material/IconButton";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ButtonToogleTheme() {
  const { theme, toggleTheme } = useContext(SettingsContext)

  return (
    <IconButton size="small" id="btn-toogle-theme" onClick={() => toggleTheme()}>
      {theme === 'light' ?
        <WbSunnyIcon id="sun-icon" fontSize="small" htmlColor=" #FDB813" /> :
        <DarkModeIcon id="smoon-icon" fontSize="small" htmlColor=" #c9c9c9" />
      }
    </IconButton>
  )
}