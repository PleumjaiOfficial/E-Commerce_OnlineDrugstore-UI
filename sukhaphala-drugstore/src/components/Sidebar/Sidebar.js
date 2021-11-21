import React from 'react'
import classes from './Sidebar.module.css';

//this component will be use to filter product by thier healt goal (unfinish)
const Sidebar = () => {
	return (
		<div className={classes["sidebar"]}>
			<div className={classes["side-top"]}>
				<div className={classes["all-item"]}>Shop All</div>
			</div>

			<ul className={classes["side-menu"]}>
				<div className={classes["menu-top"]}>HEALTH GOAL</div>
				<li>
					<span className={classes["menu-item"]}>Brain</span>
				</li>
				<li>
					<span className={classes["menu-item"]} >Immunity</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Sleep</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Eyes</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Energy</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Heart</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Joints</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Skin</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Stress</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Nails</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Prenatol</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Bones</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Digestion</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Hair</span>
				</li>
				<li>
					<span className={classes["menu-item"]}>Fitness</span>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar;
