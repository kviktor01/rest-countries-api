import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCards from "../components/CountryCards";
import Search from "../components/Search";
import {
	useLazyGetCountriesByNameQuery,
	useLazyGetCountriesByRegionQuery,
	useLazyGetCountriesQuery,
} from "../state/CountryApiSlice";
import {
	getAllCountry,
	getCountries,
	setCountries,
	setAllCountry,
} from "../state/CountrySlice";

export default function MainPage() {
	const [getApiCountries] = useLazyGetCountriesQuery();
	
	const dispatch = useDispatch();
	const countries = useSelector(getCountries);
	const allCountry = useSelector(getAllCountry);
	const onSearch = () => {
		let countries2 = [];
		if (name !== "" || region !== "") {
			if (name !== "") {
				countries2 = allCountry.filter((country) => {
					let substring = country.name.common.substr(0, name.length);
					return substring.toLowerCase() === name;
				});
				console.log(countries2);
				if(region !== "") {
					countries2 = countries2.filter((country) => country.region === region);
				}
				dispatch(setCountries(countries2));
				return;
			}
			if (region !== "") {
				countries2 = allCountry.filter((country) => country.region === region);
				dispatch(setCountries(countries2));
				return;
			}
			
		}
		
		dispatch(setCountries(allCountry));
	};
	useEffect(() => {
		if (!allCountry) {
			getApiCountries()
				.unwrap()
				.then((data) => {
					console.log(data);
					dispatch(setAllCountry(data));
					dispatch(setCountries(data));
				});
			console.log("hello");
		}
	}, []);
	

	const [name, setName] = useState("");
	const [region, setRegion] = useState("");

	useEffect(() => {
		onSearch();
	},[name, region]);
	
	const onRegionChange = (e) => {
		setRegion(e.target.value);
		
	};
	const onNameSearch = (e) => {
		setName(e.target.value);
		
	};
	return (
		<div className="container">
			<div className="filter-container">
				<Search value={name} onSearch={onNameSearch}></Search>{" "}
				<select value={region} onChange={(e) => onRegionChange(e)}>
					<option value="">Filter by region</option>
					<option value="Africa">Africa</option>
					<option value="America">America</option>
					<option value="Asia">Asia</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</div>
			{countries ? (
				<CountryCards countries={countries}></CountryCards>
			) : (
				"Loading..."
			)}
		</div>
	);
}
