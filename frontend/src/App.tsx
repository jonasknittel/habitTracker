import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menubar } from "primereact/menubar";
import Home from './pages/Home';
import About from './pages/About';
import { getUser } from './api/userApi';


function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await getUser();
      console.log(response.data[0].name);
      setUsername(response.data[0].name);
    };
    fetchUsername();
  }, []);

  console.log(username);

  const items = [
    { label: username || "Loading..." }
  ];

  return (
    <>
      <Menubar model={items}></Menubar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
