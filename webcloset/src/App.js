import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./navbar";
import Jean from "./jean";
import Tshirt from "./Tshirt";
import Sweater from "./Sweater";
import Hoodie from "./Hoodie";
import Profile from "./Profile";
import Contact from "./Contact"
import Payment from "./payment";
import Cart from "./Cart";

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar setPage={setPage} />

        {page === "Home" ? (
          <Home />
        ) : page === "Login" ? (
          <Login setPage={setPage} /> // ส่ง setPage ผ่าน props ไปยัง Login component
        ) : page === "jean" ? (
          <Jean />
        ) : page === "Tshirt" ? (
          <Tshirt />
        ) : page === "Sweater" ? (
          <Sweater />
        ) : page === "Hoodie" ? (
          <Hoodie />
        ) : page === "Profile" ? (
          <Profile setPage={setPage} />
        ) : page === "Cart" ? (
          <Cart setPage={setPage} />
        ) : page === "Payment" ? (
          <Payment setPage={setPage} />
        ) : page === "Contact" ? (
          <Contact/>
        ):(
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
