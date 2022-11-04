import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  var historiesTemp = [
    {
      "habitName":"Run",
      "records":["ACHIEVED","ACHIEVED","FAILED","ACHIEVED"]
    },
    {
      "habitName":"Push",
      "records":["ACHIEVED","FAILED","FAILED","ACHIEVED"]
    },
    {"habitName":"Yoga",
    "records":["ACHIEVED","ACHIEVED","ACHIEVED","ACHIEVED"]
    }
  ] 

  React.useEffect(() => {
    fetch("http://localhost:8080/history")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        histories = result;
        setHistory(result);
        updateTable();
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);

  var [histories, setHistory] = React.useState(historiesTemp);

  const handleChange = event => {

    const idArray = event.target.id.split("-")
    const habitName = idArray[0];
    const recordIdx = idArray[1];

    histories.forEach((history) => {
      if (history.habitName === habitName) {
        if (history.records[recordIdx] === "ACHIEVED") {
          history.records[recordIdx] = "FAILED"
        } else {
          history.records[recordIdx] = "ACHIEVED"
        }
      }
    });    

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(histories)
  };
  
  fetch('http://localhost:8080/history', requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          console.log(data);
        histories = data;
        setHistory(data);
        updateTable();
      })
      .catch(error => {
          console.error('There was an error!', error);
      });

    console.log(histories);

  };

  function getTableHtml() {
    const newTable = histories.map((history) => {
      var counter = 0;
      const checkboxes = history.records.map((record) => {
        return <input id={history.habitName + "-" + counter++} type="checkbox" checked={record === "ACHIEVED"} onChange={handleChange}/>
      })
      return <div>{history.habitName} {checkboxes}          

      </div>;
    });

    return newTable;
  }
  
  const [table, setTable] = React.useState(getTableHtml());

  function updateTable() {
    setTable(getTableHtml())
  }

  function createRecords() {

    console.log("createRecords");

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(histories)
  };
  
  fetch('http://localhost:8080/record', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        console.log(data);
        histories = data;
        setHistory(data);
        updateTable();
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  }

  return (
    <div className="App">
     {table}

      <div> 
        <button onClick={createRecords}>
          Create Records
        </button>
      </div>

    </div>    
  );
}

export default App;
