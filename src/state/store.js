import { configureStore } from "@reduxjs/toolkit";
import countryApiSlice from "./CountryApiSlice";
import CountrySlice from "./CountrySlice";


const initialState={};
export const store = configureStore({
    reducer:{
        countryApi:countryApiSlice.reducer,
        countries:CountrySlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countryApiSlice.middleware),
}
);