import { useState, useEffect } from 'react';


function sortPresidents(data, field) {

  const presidentsByPoliticalParty = {}
  const result = []

  for (let i = 0; i < data.length; i++) {
    let key = data[i][field]

    if (!presidentsByPoliticalParty[key]) {
      presidentsByPoliticalParty[key] = []
    }

    presidentsByPoliticalParty[key].push(data[i])
  }
  for (const key in presidentsByPoliticalParty) {
    result.push(presidentsByPoliticalParty[key])
  }

  result.sort((a, b) => {
    if (a.length > b.length) {
      return -1
    } else if (a.length > b.length) {
      return 1
    } else return 0
  })

  return result
}


const useFetchPresident = (active) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = new Date().getTime()
        const response = await fetch('https://api-colombia.com/api/v1/President');
        const finishTime = new Date().getTime()
        const duration = (finishTime - startTime) / 1000

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const result = sortPresidents(data, 'politicalParty')

        setData({ data: data, processedData: result, count: result.length, apiResponseInSec: duration });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (active === 'presidentes') {
      fetchData();
    }
  }, []);

  return [data, loading, error];
};

export default useFetchPresident;