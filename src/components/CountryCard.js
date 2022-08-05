import React from "react";

export default function CountryCard({ country, handleClick }) {
	return (
		<div className="country-card" onClick={()=>handleClick(country)}>
			<img src={country.flags.png} alt="" />
			<div className="card-text">
				<h2>{country.name.common}</h2>
				<span><strong>Population:</strong></span> <span>{country.population}</span>
				<br />
				<span><strong>Region:</strong></span> <span>{country.region}</span>
				<br />
				<span><strong>Capital:</strong></span> <span>{country.capital}</span>
			</div>
		</div>
	);
}
