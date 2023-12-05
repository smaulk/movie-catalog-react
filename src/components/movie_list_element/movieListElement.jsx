import React, {useState} from 'react';
import classes from "./movieListElement.module.css";

const MovieListElement = (props) => {


    const updateMovie = {...props.movie,
        title: truncateString(props.movie.title, 33),
    }

    const genres = truncateString(props.movie.genres.join(', '), 35);

    // Функция для обрезки строки до определенной длины
    function truncateString(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength) + '....' : str;
    }

    const isActive = props.activeItemId === props.movie.id;

    const onClick = () => {
        props.onClick(props.movie.id); // Установить активный элемент
    };

    const mainDivClasses = `${classes.element} ${isActive ? classes.clicked : ''}`;

    return (
        <div className={mainDivClasses} onClick={onClick}>
            <p>{updateMovie.title}</p>
            <div className={classes.elementInfo}>
                <p>{updateMovie.year}</p>
                <b>|</b>
                <p>{genres}</p>
            </div>
        </div>
    );
};

export default MovieListElement;