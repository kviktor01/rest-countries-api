import logo from "./logo.svg";
import "./App.css";
import { useGetCountriesQuery } from "./state/CountryApiSlice";
import { useEffect } from "react";
import CountryCard from "./components/CountryCard";
import CountryCards from "./components/CountryCards";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import MainPage from "./pages/MainPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CountryPage from "./pages/CountryPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
			<Navigation></Navigation>
			<Routes>
				<Route path="/" element={<MainPage></MainPage>}/>
				<Route path="/details" element={<CountryPage></CountryPage>}/>
			</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
