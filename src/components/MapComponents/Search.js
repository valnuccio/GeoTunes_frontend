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
            <div className="search">
            <Combobox onSelect={async(address) => {
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
                <ComboboxInput value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}
                
                disabled={!ready}
                placeholder = "Enter an address"
                />
                <ComboboxPopover>
                    <ComboboxList> 
                    {status === "OK" && data.map(({id,description})=>(
                        <ComboboxOption key={id} value={description}/>
                    ))}
                     </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            </div>
            
        )
    
    
    
    
}


export default Search