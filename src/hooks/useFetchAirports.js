import { useState, useEffect } from 'react';
import { groupByDepartmentAndCity } from './useFetchTouristicLocations';



const useFetchAirports = (departments) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/Airport');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const result = groupByDepartmentAndCity(data, departments);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (departments) {
      fetchData();
    }
  }, [departments]);

  return [data, loading, error];
};

export default useFetchAirports;