import logo from "./logo.svg";
import "./App.css";
import { useGetCountriesQuery } from "./state/CountryApiSlice";
import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import CountryCards from "./components/CountryCards";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "./pages/CountryPage";
import { createContext } from "react";

export const ThemeContext = createContext("dark");

function App() {
	const [theme,setTheme]=useState("dark");
	const toggleTheme=()=>{theme==="dark"? setTheme("light"):setTheme("dark"); console.log(theme)};
	return (
		<ThemeContext.Provider value={{theme,toggleTheme}}>
			<div className="App" id={theme}>
				<BrowserRouter>
					<Navigation toggleTheme={toggleTheme}></Navigation>
					<Routes>
						<Route path="/" element={<MainPage></MainPage>} />
						<Route path="/details" element={<CountryPage></CountryPage>} />
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
