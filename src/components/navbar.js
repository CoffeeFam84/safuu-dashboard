import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./navbar.css";
import img from "../assets/logo.png";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { connect, startUp } from "../redux/blockchain/blockchainActions";
// import Web3 from "web3";

function Navbar() {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);
  const [address, setAddress] = useState("Connect Wallet");

  const showSidebar = async () => setSidebar(!sidebar);

  const handleConnet = async (e) => {
    e.preventDefault();
    dispatch(connect());
    dispatch(startUp());
  };

  useEffect(() => {
    let account = blockchain.account;
    console.log("account = , connected", account, blockchain.connected);
    let connected = blockchain.connected;
    let address =
      connected && account
        ? account.slice(2, 6) + "..." + account.slice(38, 42)
        : "Connect Wallet";
    if (blockchain.connected) {
      setAddress(address);
    }
    // dispatch(startUp());
  }, [blockchain]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        <img  className="logo_img_sm" src={img} alt="" />
          <div className="nav_switch">
            <span onClick={handleConnet}>{address}</span>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="logo_img">
              <img src={img} alt="" />
            </div>
            {SidebarData.map((item, index) => {
              if (item.title === "Swap" || item.title === "Docs") {
                return (
                  <li key={index} className={item.cName}>
                    <a href={item.path} target="_blank" rel="noreferrer">
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
