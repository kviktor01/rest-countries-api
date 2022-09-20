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
				if (region !== "") {
					countries2 = countries2.filter(
						(country) => country.region === region
					);
				}
				countries2 = sortCountries(countries2);
				dispatch(setCountries(countries2));
				return;
			}
			if (region !== "") {
				countries2 = allCountry.filter((country) => country.region === region);
				countries2 = sortCountries(countries2);
				dispatch(setCountries(countries2));
				return;
			}
		}
		let countries3=null;
		if(allCountry){
		countries3 = JSON.parse(JSON.stringify(allCountry));
		countries3 = sortCountries(countries3);
		}
		dispatch(setCountries(countries3));
	};
	useEffect(() => {
		if (!allCountry) {
			getApiCountries()
				.unwrap()
				.then((data) => {
					console.log(data);
					let countries = JSON.parse(JSON.stringify(data));
					countries = sortCountries(countries);
					dispatch(setAllCountry(countries));
					dispatch(setCountries(countries));
				});

			console.log("hello");
		}
	}, []);
	const sortCountries = (countries) => {
		if (sortDirection === "ascending") {
			switch (sortProp) {
				case "name":
					countries.sort((c1, c2) => {
						//console.log(c1.name.common, c2.name.common);
						return c1.name.common.localeCompare(c2.name.common);
					});

					return countries;
				case "population":
					console.log("hello from population")
					countries.sort((c1, c2) => {
						return (c1.population - c2.population);
					});
					return countries;
				case "area":
					countries.sort((c1, c2) => {
						return (c1.area - c2.area );
					});
					return countries;
				default:
					return countries;
			}
		} else {
			switch (sortProp) {
				case "name":
					countries.sort((c1, c2) => {
						//console.log(c1.name.common, c2.name.common);
						return c2.name.common.localeCompare(c1.name.common);
					});

					return countries;
				case "population":
					countries.sort((c1, c2) => {
						return c2.population - c1.population;
					});
					return countries;
				case "area":
					countries.sort((c1, c2) => {
						return c2.area - c1.area;
					});
					return countries;
				default:
					return countries;
			}
		}
	};
	const [name, setName] = useState("");
	const [region, setRegion] = useState("");
	const [sortProp, setSortProp] = useState("name");
	const [sortDirection, setSortDirection] = useState("ascending");
	useEffect(() => {
		onSearch();
	}, [name, region]);

	useEffect(() => {
		if (allCountry) {
			let countries2 = JSON.parse(JSON.stringify(countries));
			countries2 = sortCountries(countries2);
			dispatch(setCountries(countries2));
			console.log(sortProp);
		}
	}, [sortProp, sortDirection]);

	const onChange = (e, fn) => {
		fn(e.target.value);
	};

	return (
		<div className="container">
			<div className="filter-container">
				<Search value={name} onSearch={(e) => onChange(e, setName)}></Search>{" "}
				<select value={region} onChange={(e) => onChange(e, setRegion)}>
					<option value="">Filter by region</option>
					<option value="Africa">Africa</option>
					<option value="Americas">America</option>
					<option value="Asia">Asia</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</div>
			<div className="sort-container">
				<div>
					<label htmlFor="sort">Sort by</label>
					<select
						name="sort"
						value={sortProp}
						onChange={(e) => onChange(e, setSortProp)}
					>
						<option value="name">Name</option>
						<option value="population">Population</option>
						<option value="area">Area</option>
					</select>
				</div>
				<div>
					<label htmlFor="direction">Sort direction</label>
					<select
						name="direction"
						onChange={(e) => onChange(e, setSortDirection)}
						value={sortDirection}
					>
						<option value="descending">Descending</option>
						<option value="ascending">Ascending</option>
					</select>
				</div>
			</div>
			{countries ? (
				<CountryCards countries={countries}></CountryCards>
			) : (
				"Loading..."
			)}
		</div>
	);
}
