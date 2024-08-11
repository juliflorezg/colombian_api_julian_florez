import { useState, useEffect } from "react";



const useFetchDepartments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function getDepartments() {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/Department');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setData(data);
        return data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    getDepartments()
  }, [])

  return [data, loading, error]
};

export default useFetchDepartments