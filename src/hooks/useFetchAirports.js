import { useState, useEffect } from 'react';
import { groupByDepartmentAndCity } from './useFetchTouristicLocations';



const useFetchAirports = (departments, active) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = new Date().getTime()
        const response = await fetch('https://api-colombia.com/api/v1/Airport');
        const finishTime = new Date().getTime()
        const duration = (finishTime - startTime) / 1000

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const result = groupByDepartmentAndCity(data, departments);
        setData({ data: data, processedData: result, count: data.length, apiResponseInSec: duration });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (departments && active === "aeropuertos") {
      fetchData();
    }
  }, [departments, active]);

  return [data, loading, error];
};

export default useFetchAirports;