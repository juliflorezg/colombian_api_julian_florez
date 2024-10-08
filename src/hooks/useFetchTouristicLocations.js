import { useState, useEffect } from 'react';


export function groupByDepartmentAndCity(data, departments) {

  const locationsByDepartment = {}

  for (let i = 0; i < data.length; i++) {
    // let departmentKey = departments[data[i].city.departmentId]
    const departmentKey = departments.find(dept => dept.id === data[i].city.departmentId).name;
    let cityKey = data[i].city.name


    if (!locationsByDepartment[departmentKey]) {

      locationsByDepartment[departmentKey] = {}
    }

    if (!locationsByDepartment[departmentKey][cityKey]) {
      locationsByDepartment[departmentKey][cityKey] = {}
    }
    if (!locationsByDepartment[departmentKey][cityKey].items) {
      locationsByDepartment[departmentKey][cityKey].items = []

    }

    locationsByDepartment[departmentKey][cityKey].items.push(data[i])
  }

  for (const department in locationsByDepartment) {
    // const department = locationsByDepartment[i];
    for (const city in locationsByDepartment[department]) {
      if (!locationsByDepartment[department][city].count) {
        locationsByDepartment[department][city].count = 0
      }

      locationsByDepartment[department][city].count = locationsByDepartment[department][city].items.length
    }
  }

  return locationsByDepartment
}


const useFetchTouristicLocations = (departments, active) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = new Date().getTime()
        const response = await fetch('https://api-colombia.com/api/v1/TouristicAttraction');
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

    if (departments && active === 'atracciones') {
      fetchData();
    }
  }, [departments, active]);

  return [data, loading, error];
};

export default useFetchTouristicLocations;