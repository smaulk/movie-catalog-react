import React from 'react';
import classes from "./header.module.css";

const Header = (props) => {
    return (
        <div className={classes.header}>
            <h1>{props.title}</h1>
            <p>{props.author}</p>
        </div>
    );
};

export default Header;