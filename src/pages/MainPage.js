import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCards from "../components/CountryCards";
import Search from "../components/Search";
import {
	useLazyGetCountriesByNameQuery,
	useLazyGetCountriesByRegionQuery,
	useLazyGetCountriesQuery,
} from "../state/CountryApiSlice";
import { getCountries, setCountries } from "../state/CountrySlice";

export default function MainPage() {
	const [getApiCountries] = useLazyGetCountriesQuery();
	const [getCountriesByRegion] = useLazyGetCountriesByRegionQuery();
	const [getCountriesByName] = useLazyGetCountriesByNameQuery();
	const dispatch = useDispatch();
	const countries = useSelector(getCountries);
	useEffect(() => {
		getApiCountries()
			.unwrap()
			.then((data) => {
				console.log(data);
				dispatch(setCountries(data));
			});
		console.log("hello");
	}, [dispatch, getApiCountries]);

	const [name, setName] = useState("");
	const [region, setRegion] = useState("");

	const onRegionChange = (e) => {
		if (e.target.value !== "") {
			setRegion(e.target.value);
			getCountriesByRegion(e.target.value)
				.unwrap()
				.then((data) => {
					dispatch(setCountries(data));
				});
		} else {
			setRegion("");
			getApiCountries()
				.unwrap()
				.then((data) => {
					console.log(data);
					dispatch(setCountries(data));
				});
		}
	};
	const onNameSearch = (e) => {
		if (e.target.value !== "") {
			setName(e.target.value);
			getCountriesByName(e.target.value)
				.unwrap()
				.then((data) => {
					dispatch(setCountries(data));
				});
		}else{
			setName("");
			getApiCountries()
				.unwrap()
				.then((data) => {
					console.log(data);
					dispatch(setCountries(data));
				});
		}
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
