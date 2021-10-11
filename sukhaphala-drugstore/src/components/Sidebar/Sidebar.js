import React from 'react'
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={classes["sidebar"]}>
            <div className={classes["vertical-line"]}></div>

            <h3>Shop All </h3>
            <h2>HEALTH GOAL</h2>

            <ul className={classes["side-menu"]}>
                <li>
                    <span className={classes["menu-item"]}>fever</span>
                </li>
                <li>
                    <span className={classes["menu-item"]} >Happy</span>
                </li>
                <li>
                    <span className={classes["menu-item"]}>Stress</span>
                </li>
                <li>
                    <span className={classes["menu-item"]}>Beauty</span>
                </li>
                <li>
                    <span className={classes["menu-item"]}>Smart</span>
                </li>
                <li>
                    <span className={classes["menu-item"]}>Weed</span>
                </li>
                <li>
                    <span className={classes["menu-item"]}>Lover</span>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
