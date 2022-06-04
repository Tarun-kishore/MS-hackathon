import React from "react";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setData(data.message);
      })
      .catch((e) => console.log("error" + e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
