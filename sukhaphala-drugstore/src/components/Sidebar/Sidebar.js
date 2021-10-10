import React from 'react'
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="vertical-line"></div>

            <h3>Shop All </h3>
            <h2>HEALTH GOAL</h2>

            <ul className="Side-menu">
                <li>
                    <span className="menu-item">fever</span>
                </li>
                <li>
                    <span className="menu-item" >Happy</span>
                </li>
                <li>
                    <span className="menu-item" >Stress</span>
                </li>
                <li>
                    <span className="menu-item" >Beauty</span>
                </li>
                <li>
                    <span className="menu-item" >Smart</span>
                </li>
                <li>
                    <span className="menu-item" >Weed</span>
                </li>
                <li>
                    <span className="menu-item" >Lover</span>
                </li>
            </ul>


        </div>
    )
}

export default Sidebar;
