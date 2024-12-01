import React from "react";
import '../App.css';
import '../index.css';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='sticky top-0 left-0 right-0 bg-black md:px-12 px-4 micro-5 md:text-3xl text-lg'>
            <div className="border-b border-white flex md:justify-center py-4 justify-between">
                <div className="md:w-1/2 w-auto h-16 flex items-center">
                    <img src="../assets/logos/level-up-logo.webp" className="h-3/4 md:block hidden" />
                    <img src="../assets/logos/level-up-logo_mini.webp" className="h-3/4 md:hidden block" />
                </div>
                <div className="md:w-1/2 w-auto h-16 flex md:gap-16 gap-10 items-center justify-end uppercase">
                    <NavLink 
                        to={'/'}
                        className={({ isActive }) =>
                            [
                                isActive ? "text-orange" : "text-white",
                                "transition transform hover:scale-110 hover:rotate-3 hover:text-yellow-400 hover:shadow-lg"
                            ].join(" ")
                        }>
                        Home
                    </NavLink>
                    <NavLink 
                        to={'/viewall'}
                        className={({ isActive }) =>
                            [
                                isActive ? "text-orange" : "text-white",
                                "transition transform hover:scale-110 hover:rotate-3 hover:text-yellow-400 hover:shadow-lg"
                            ].join(" ")
                        }>
                        Graduate List
                    </NavLink>
                    <NavLink 
                        to={'/create'}
                        className={({ isActive }) =>
                            [
                                isActive ? "text-orange" : "text-white",
                                "transition transform hover:scale-110 hover:rotate-3 hover:text-yellow-400 hover:shadow-lg"
                            ].join(" ")
                        }>
                        Create Graduate
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
