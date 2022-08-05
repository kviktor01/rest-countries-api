import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    countries:null,
    selectedCountry:null,
}

const countriesSlice=createSlice({
    name:"countries",
    initialState,
    reducers:{
        setCountries:(state,{payload})=>{
           state.countries=payload;
            
        },
        setSelectedCountry:(state,{payload})=>{
            state.selectedCountry=payload;
        }
    }    
});

export const {setCountries,setSelectedCountry} = countriesSlice.actions;

export default countriesSlice.reducer;

export const getCountries=(state)=> state? state.countries? state.countries.countries:null:null;
export const getSelectedCountry =(state)=>state? state.countries ? state.countries.selectedCountry:null: null;