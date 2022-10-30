import './App.css';

function App() {

  const histories = [{
    historyName: "run",
    records: ["ACHIEVED", "FAILED", "ACHIEVED"]
  },
  {
    historyName: "push ups",
    records: ["ACHIEVED", "FAILED"]
  },
  {
    historyName: "yoga", 
    records: ["ACHIEVED", "FAILED"]
  }]

  var increment = 0
  const listItems = histories.map((history) => {
    const records = history.records.map((record) => {
      increment++;
      var isChecked = false;
      if (record === 'ACHIEVED') {
        isChecked = true;
      } else {
        isChecked = false;
      }
      
      console.log(isChecked);
      console.log(record);

      return <input id={increment} type="checkbox" checked={isChecked} onChange={() => isChecked(!true)}/>;
    });

    return <div>{history.historyName} {records}</div>
  });

  return (
    <div className="App"> {listItems} </div>
  );
}

export default App;
