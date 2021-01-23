import React from 'react';
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import styled from 'styled-components';

const SearchContainer = styled.div`
width:100%

`

const StyledCombobox = styled(Combobox)`
width:100%

`

const StyledComboboxInput = styled(ComboboxInput)`
width:99%;
height:5vh;
position:absolute;
top:15px;
margin-left:4px;

z-index:1

`

const Search = ({panTo}) =>{
        const {
            ready,
            value, 
            suggestions:{status, data}, 
            setValue, 
            clearSuggestions,
        } = usePlacesAutoComplete({
            requestOptions:{
                location: { lat: () => 40.7128 , lng: () => -74.0060},
                
                radius: 200 * 1000,
    
            }
        });
    
        return (
            <SearchContainer>
                    <StyledCombobox onSelect={async(address) => {
                        setValue(address, false);
                        clearSuggestions()
                        try {
                        const results = await getGeocode({address});
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({lat, lng})
                        } catch(err ) {
                            console.log("error!")
                        }
                console.log(address)}}
                    >
                        <StyledComboboxInput value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        
                        disabled={!ready}
                        placeholder = "Search by Location"
                        />
                        <ComboboxPopover>
                            <ComboboxList> 
                            {status === "OK" && data.map(({id,description})=>(
                                <ComboboxOption key={id} value={description}/>
                            ))}
                            </ComboboxList>
                        </ComboboxPopover>
                    </StyledCombobox>
            </SearchContainer>
            
        )
    
}


export default Search