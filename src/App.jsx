import React, { useEffect, useState } from 'react'
import './App.css'
import CustomTable from './components/CustomTable';

const columns = ['S.No.','Percentage funded','Amount pledged']

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/master/frontend-assignment.json")
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error("Error fetching data:", error));
  }, []);
  console.log({data})
  return (
    <CustomTable columns={columns}  data={data} />
  )
}

export default App