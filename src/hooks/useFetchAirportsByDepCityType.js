import { useState, useEffect } from 'react';
// import { groupByDepartmentAndCity } from './useFetchTouristicLocations';


function groupByRegionDepartmentCityAndType(data, departments, regions) {
  console.log('hereeeeeeeeeeee')
  console.log(data)
  console.log(regions)

  const result = { region: {} }
  for (const r of regions) {
    result.region[r.name] = {
      departamento: {}
    }
  }

  for (let i = 0; i < data.length; i++) {
    //  [0].department.regionId
    const regionKey = regions.find(r => r.id === data[i].department.regionId).name;
    //  [0].deparmentId
    const departmentKey = departments.find(d => d.id === data[i].department.id).name;
    const cityKey = data[i].city.name
    const type = data[i].type

    console.log({
      regionKey,
      departmentKey,
      cityKey,
      type
    })
    if (!result.region[regionKey].departamento[departmentKey]) {
      result.region[regionKey].departamento[departmentKey] = { ciudad: {} }
    }
    if (!result.region[regionKey].departamento[departmentKey].ciudad[cityKey]) {
      result.region[regionKey].departamento[departmentKey].ciudad[cityKey] = { tipo: {} }
    }
    if (!result.region[regionKey].departamento[departmentKey].ciudad[cityKey].tipo[type]) {
      result.region[regionKey].departamento[departmentKey].ciudad[cityKey].tipo[type] = 0
    }

    result.region[regionKey].departamento[departmentKey].ciudad[cityKey].tipo[type]++
  }

  console.log(result)
  console.log(JSON.stringify(result))


  return {}
}


const useFetchAirportsByDepCityType = (departments, regions) => {
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

        const result = groupByRegionDepartmentCityAndType(data, departments, regions);
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
  }, [departments, regions]);

  return [data, loading, error];
};

export default useFetchAirportsByDepCityType;