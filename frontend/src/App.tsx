import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menubar } from "primereact/menubar";
import 'primeicons/primeicons.css';
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


  const end = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2vw', paddingRight: '1vw' }}>
      <p className="font-medium m-0">{username}</p>
      <i className="pi pi-user text-xl" style={{ fontSize: '1.5rem' }}></i>
    </div>
  );

  return (
    <>
      <Menubar model={items} end={end} style={{ justifyContent: "center" }}></Menubar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
