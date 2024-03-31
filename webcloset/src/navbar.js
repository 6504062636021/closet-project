import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLongArrowAltRight,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
function Navbar(props) {
  let { setPage } = props;

  const [showSearch, setShowSearch] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showItems, setShowItems] = useState(false);
 

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleServices = () => setShowServices(!showServices);
  const toggleItems = () => setShowItems(!showItems);

  return (
    <div className="wrapper">
      <nav>
        <input
          type="checkbox"
          id="show-search"
          checked={showSearch}
          onChange={toggleSearch}
        />
        <div className="logo">ClosetShop</div>
        <div className="content">
          <ul className="links">
            <li>
              <a href="#" onClick={() => setPage("Home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#" className="desktop-link" onClick={toggleServices}>
                Product
              </a>
              <input
                type="checkbox"
                id="show-services"
                checked={showServices}
                onChange={toggleServices}
              />
              <label htmlFor="show-services">Product</label>
              <ul>
                <li>
                  <a href="#" onClick={() => setPage("jean")}>
                    Jean
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setPage("Tshirt")}>
                    T-shirt
                  </a>
                </li>
                <li>
                  <a href="#" className="desktop-link" onClick={toggleItems}>
                    Coat
                  </a>
                  <input
                    type="checkbox"
                    id="show-items"
                    checked={showItems}
                    onChange={toggleItems}
                  />
                  <label htmlFor="show-items">moreitem</label>
                  <ul>
                    <li>
                      <a href="#" onClick={() => setPage("Sweater")}>
                        Sweater
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setPage("Hoodie")}>
                        Hoodie
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>
        <label htmlFor="show-search" className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </label>
        <form action="#" className="search-box">
          <input
            type="text"
            placeholder="Type Something to Search..."
            required
          />
          <button type="submit" className="go-icon">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </button>
        </form>
        <label htmlFor="show-cart" className="cart-icon" onClick={() => setPage("Cart")}>
          <FontAwesomeIcon icon={faCartShopping} />
        </label>
        <label
          htmlFor="show-profile"
          className="profile-icon"
          onClick={() => setPage("Login")}
        >
          <FontAwesomeIcon icon={faUser} />
        </label>
      </nav>
    </div>
  );
}

export default Navbar;
