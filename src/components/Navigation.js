import React, { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Navigation({toggleTheme}) {
  const theme = useContext(ThemeContext);
  console.log(theme);
  return (
    <div className="navigation"><span className="title">Where in the world?</span> <span onClick={toggleTheme}>{theme.theme==="dark"? "Dark mode":"Light mode"}</span></div>
  )
}
