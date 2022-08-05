import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSelectedCountry } from "../state/CountrySlice";
import CountryCard from "./CountryCard";
import Search from "./Search";

export default function CountryCards({ countries }) {
	const dispatch=useDispatch();
	const navigate=useNavigate();
	const handleClick=(country)=>{
		dispatch(setSelectedCountry(country));
		navigate("/details");
	}
	return (
		<div className="country-card-container">
			{countries.map((country,index) => (
				<CountryCard key={index} country={country} handleClick={handleClick}></CountryCard>
			))}
		</div>
	);
}
