import React, { useState, useContext } from "react";
import { AuthContext } from "../firebase";
import add from "./images/icons/add.svg";
import home from "./images/icons/home.svg";
import list from "./images/icons/list.svg";
import whale from "./images/icons/whale.svg";
import none from "./images/icons/userphoto.svg";
import addActive from "./images/icons/add_active.svg";
import homeActive from "./images/icons/home_active.svg";
import listActive from "./images/icons/list_active.svg";
import whaleActive from "./images/icons/whale_active.svg";
import NavItem from "./NavItem";
import { NavContainer } from "./styles/nav.css";

export default function Nav() {
  const navIcons = [
    { name: "Add", url: add, urlActive: addActive, path: "/Add" },
    { name: "Home", url: home, urlActive: homeActive, path: "/Home" },
    { name: "List", url: list, urlActive: listActive, path: "/List" },
    { name: "Whale", url: whale, urlActive: whaleActive, path: "/Whale" },
    { name: "User", url: none, urlActive: none, path: "/User" },
  ];

  const [iconActive, setIconActive] = useState("Home");
  function handleIconChanged(e) {
    setIconActive(e);
    console.log("iconActive:", iconActive);
  }

  const NavList = navIcons.map((icon) => (
    <NavItem
      key={icon.name}
      icon={icon}
      handleIconChanged={handleIconChanged}
      iconActive={iconActive}
    ></NavItem>
  ));

  const currentUser = useContext(AuthContext);

  return (
    <div>
      <NavContainer display={currentUser.currentUser == null ? "none" : "flex"}>
        {NavList}
      </NavContainer>
    </div>
  );
}
