import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext';
import logo from '../../../public/logo.png';
import { authcontext } from '../../Context/AuthContext';
import { useContext } from 'react';


import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { IsLoggedIn, setIsLoggedIn } = useContext(authcontext);
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "Categories" },
    { label: "Brands", href: "Brands" },
    { label: "Cart", href: "Cart" },
    { label: "WishList", href: "WishList" },
    { label: "All Orders", href: "allorders" },
  ];

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    setIsLoggedIn(false);
  }

  return (
    <Navbar className="container" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
       {IsLoggedIn && <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden" />}
        <NavbarBrand>
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-8 mr-1" alt="Logo" />
            <p className="font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent me-5">Yalla Shop</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      { IsLoggedIn &&
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <NavLink
              to={item.label === "Home" ? "/" : "/" + item.href}
              className={({ isActive }) =>
                isActive
                  ? "font-bold main-header-color pb-1"
                  : "text-gray-800 dark:text-gray-300"
              }
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      }

     { 
      IsLoggedIn &&
       <NavbarContent justify="end">
          <NavbarItem>
            <button onClick={logOut} type="button" className=' p-2 rounded-md  px-4 py-2 text-sm font-semibold bg-red-500' variant="flat">
              Sign Out
            </button>
          </NavbarItem>
        </NavbarContent>
     }
      {!IsLoggedIn &&  
        <NavbarContent justify="end">
          <NavbarItem>
            <button type="button" className=' p-2 rounded-md  px-4 py-2 text-sm font-semibold btn-gradient' variant="flat">
              <NavLink to={"/login"}>
                Login
              </NavLink>
            </button>
          </NavbarItem>
        </NavbarContent>
      }

    {  IsLoggedIn &&
    <NavbarMenu
    className="fixed left-0 top-10 bg-transparentrounded-md w-3/4 p-6 lg:hidden shadow rounded-md"
    >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index} onClick={() => setIsMenuOpen(false)}>
            <NavLink
              to={item.label === "Home" ? "/" : "/" + item.href}
              className={({ isActive }) =>
                isActive
                  ? "main-header-color font-bold pb-1"
                  : "text-black dark:text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                }
            >
              {item.label}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    }

      <NavbarContent justify="center">
        <NavbarItem>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md  px-4 py-2 text-sm font-semibold btn-gradient "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
