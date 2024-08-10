import { useState, useEffect } from "react";



const useFetchRegions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function getRegions() {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/Region');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // const result = sortPresidents(data, 'politicalParty')
        console.log(data)
        setData(data);
        return data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    getRegions()
  }, [])

  return [data, loading, error]
};

export default useFetchRegions