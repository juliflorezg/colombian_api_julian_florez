import { useState, useEffect } from 'react';


function sortPresidents(data, field, sort) {

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


  console.log(presidentsByPoliticalParty)


  console.log(result)
  return result
}


const useFetchPresident = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/President');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const result = sortPresidents(data, 'politicalParty', 'descendant')
        console.log(result)

        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, loading, error];
};

export default useFetchPresident;