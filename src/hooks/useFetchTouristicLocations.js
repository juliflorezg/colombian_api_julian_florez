import { useState, useEffect } from 'react';


export function groupByDepartmentAndCity(data, departments) {
  console.log({ data, departments })

  const locationsByDepartment = {}
  console.log(locationsByDepartment)
  console.log(locationsByDepartment)
  // const result = []

  for (let i = 0; i < data.length; i++) {
    // let departmentKey = departments[data[i].city.departmentId]
    const departmentKey = departments.find(dept => dept.id === data[i].city.departmentId).name;
    let cityKey = data[i].city.name

    console.log(departmentKey)
    console.log(cityKey)
    console.log(locationsByDepartment[departmentKey])
    console.log(locationsByDepartment[cityKey])
    // console.log(locationsByDepartment[departmentKey][cityKey])

    console.log(!locationsByDepartment[departmentKey])
    if (!locationsByDepartment[departmentKey]) {

      locationsByDepartment[departmentKey] = {}
    }

    console.log(!locationsByDepartment[departmentKey][cityKey])
    if (!locationsByDepartment[departmentKey][cityKey]) {
      locationsByDepartment[departmentKey][cityKey] = {}
    }
    if (!locationsByDepartment[departmentKey][cityKey].items) {
      locationsByDepartment[departmentKey][cityKey].items = []

    }

    locationsByDepartment[departmentKey][cityKey].items.push(data[i])
    console.log(locationsByDepartment[departmentKey][cityKey])
    console.log(locationsByDepartment)
  }

  for (const department in locationsByDepartment) {
    // const department = locationsByDepartment[i];
    console.log({ department })
    for (const city in locationsByDepartment[department]) {
      console.log(locationsByDepartment[department][city])
      console.log(city)
      console.log(locationsByDepartment[department][city].count)
      if (!locationsByDepartment[department][city].count) {
        locationsByDepartment[department][city].count = 0
      }

      locationsByDepartment[department][city].count = locationsByDepartment[department][city].items.length
    }
  }

  console.log(locationsByDepartment)
  // console.log(result)
  return locationsByDepartment
}


const useFetchTouristicLocations = (departments) => {
  console.log(departments)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/TouristicAttraction');
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

export default useFetchTouristicLocations;