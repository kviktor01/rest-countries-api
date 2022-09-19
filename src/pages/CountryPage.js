import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllCountry, getSelectedCountry, setSelectedCountry } from "../state/CountrySlice";

export default function CountryPage() {
	const selectedCountry = useSelector(getSelectedCountry);
	const allCountry = useSelector(getAllCountry);
	console.log(selectedCountry);
	const dispatch= useDispatch();
	const navigate = useNavigate();
	const onBackClick = () => {
		navigate("/");
	};
	const selectCountry=(country_cca3)=>{
		const country=allCountry.find(country=>country.cca3===country_cca3);
		dispatch(setSelectedCountry(country))
	}
	return (
		<div className="container">
			<button className="back-button" onClick={onBackClick}>
				<i className="fa-solid fa-arrow-left"></i> Back
			</button>
			<div className="country-container">
				<img src={selectedCountry.flags.png} alt=""></img>
				<div className="country-datas">
					<h2>{selectedCountry.name.common}</h2>
					<div className="country-data-grid-container">
						<div>
							<span>
								<strong>Native name: </strong>
								{selectedCountry.name.common}
							</span>
							<span>
								<strong>Population: </strong>
								{selectedCountry.population}
							</span>
							<span>
								<strong>Region: </strong>
								{selectedCountry.region}
							</span>
							<span>
								<strong>Sub region: </strong>
								{selectedCountry.subregion}
							</span>
							<span>
								<strong>Capital: </strong>
								{selectedCountry.capital}
							</span>
						</div>
						<div>
							<span>
								<strong>Top level domain:</strong>
								{selectedCountry.tld[0]}
							</span>
							<span>
								<strong>Currencies: </strong>
								{Object.values(selectedCountry.currencies).map(
									(currency, index) => {
										if (
											index + 1 !==
											Object.values(selectedCountry.currencies).length
										) {
											return currency.name + ", ";
										} else {
											return currency.name;
										}
									}
								)}
							</span>
							<span>
								<strong>Languages: </strong>
								{Object.values(selectedCountry.languages).map(
									(language, index) => {
										if (
											index + 1 !==
											Object.values(selectedCountry.languages).length
										) {
											return language + ", ";
										} else {
											return language;
										}
									}
								)}
							</span>
						</div>
					</div>
					<div>
						<span>
							<strong>Border countries: </strong>
							{selectedCountry.borders
								? selectedCountry.borders.map((border, index) => {
										return (
											<span onClick={() =>selectCountry(border)} key={border} className="border">
												{allCountry.find(country=>border===country.cca3).name.common}
												
											</span>
										);
								  })
								: ""}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
