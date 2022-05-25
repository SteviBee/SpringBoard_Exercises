import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

function useAxios(url, moreUrl=[]) {
    // empty array state to hold all the data back from axios call"
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    // NOT RIGHT BUT LEAVING SO I LEARN
    // Call useEffect after first render and to fetch data
    // Output should be the data via the local state
    // useEffect(() => { 
    // const initalAxiosData = async () => {
    //     try {
    //         const resp = await axios.get(url)
    //         setData(items => [...items, {...resp.data, id: uuid()}])

    //     } catch (error) {
    //         console.log("Error ---- ", err)
    //         setErr(error)
    //         }
    //         setIsLoading(false); 
    //     };
    //     return initalAxiosData; 
    // }, [url]);
    

    // Pass funcion along to components so they can add a new object to the array
      const axiosData = async (name) => {
        try {
            console.log("name is", name, typeof name)
            // Adding for additional URL add:
            if (typeof name !== "string") {
                console.log("it worked...options")
                const resp = await axios.get(url)
                setData(items => [...items, {...resp.data, id: uuid()}])
            } else {
                console.log("figred in POKEMOVE")
                let newerURL = url + name
                const resp = await axios.get(newerURL)
                setData(items => [...items, {...resp.data, id: uuid()}])
            }

        } catch (error) {
            console.log("Error ---- ", err)
            setErr(error)
        };
        setIsLoading(false);
    }

    // return state, function, and loading
    return [data, axiosData, isLoading];
}

export default useAxios;
