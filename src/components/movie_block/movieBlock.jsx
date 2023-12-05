import React, {useState} from 'react';
import classes from "./movieBlock.module.css";
import ImgWithUrlCheck from "../ImgWithUrlCheck";
import imgDefault from '../../images/No-Image-Placeholder.png'

const MovieBlock = (props) => {


    const updateMovie = {...props.movie,
        title: truncateString(props.movie.title, 33),
        plot: truncateString(props.movie.plot, 1500)
    }
    const genres = truncateString(props.movie.genres.join(', '), 50);

    const actors = (len) => {
        let arr = props.movie.actors.split(',');
        let arrLenght = arr.length;
        if(arrLenght > len) {
            arr = arr.slice(0, len);
            arr.push(`и еще ${arrLenght - len}....`)
        }
        return arr;
    }

    // Функция для обрезки строки до определенной длины
    function truncateString(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength) + '....' : str;
    }

    function copyText(){
        navigator.clipboard.writeText(props.movie.id);
    }

    if(props.movie.id <=0) return (<div className={classes.block}></div>)
    return (
        <div className={classes.block}>
            <div className={classes.header}>
                <div className={classes.movieId}>
                    <p>Id: {props.movie.id}</p>
                    <svg onClick={copyText} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="ic-copy" fill-rule="evenodd" clip-rule="evenodd" d="M9 2H2V10C2 10.552 1.55228 11 1 11C0.447715 11 0 10.552 0 10V2C0 0.895581 0.895052 0 2 0H9C9.55229 0 10 0.447962 10 1C10 1.55314 9.55229 2.0011 9 2ZM5 5H12V12H5V5ZM5 14H12C13.1049 14 14 13.1044 14 12V5C14 3.89558 13.1049 3 12 3H5C3.89505 3 3 3.89558 3 5V12C3 13.1044 3.89505 14 5 14Z" fill="#333333"/>
                    </svg>
                </div>

                <button onClick={props.onClickEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 13.5858V9.17157L13.5858 0.585786C14.3668 -0.195262 15.6332 -0.195262 16.4142 0.585786L18 2.17157C18.781 2.95262 18.781 4.21895 18 5L9.41421 13.5858H5ZM14 15.5858V12.5858L16 10.5858V12.5858V15.5858C16 17.2426 14.6569 18.5858 13 18.5858H3C1.34315 18.5858 0 17.2426 0 15.5858V5.58579C0 3.92893 1.34315 2.58579 3 2.58579H6H8L6 4.58579H3C2.44772 4.58579 2 5.0335 2 5.58579V15.5858C2 16.1381 2.44772 16.5858 3 16.5858H13C13.5523 16.5858 14 16.1381 14 15.5858ZM15 2L16.5858 3.58579L8.58579 11.5858H7V10L15 2Z" fill="#333333"/>
                    </svg>
                    Редактировать
                </button>
            </div>


            <div className={classes.mainPart}>
                <div className={classes.imageContainer}>
                    <ImgWithUrlCheck
                        src={props.movie.posterUrl}
                        defaultSrc={imgDefault}
                        alt={props.movie.title}
                    />
                </div>

                <div className={classes.movieInfo}>

                    <h1>{updateMovie.title}</h1>
                    <p>{updateMovie.director}</p>

                    <div className={classes.movieMainInfo}>

                        <div className={classes.movieParams}>
                            <h3>Параметры</h3>
                            <div>
                                <p>Год производства:</p>
                                <p>{props.movie.year}</p>
                            </div>
                            <div>
                                <p>Жанр:</p>
                                <p>{genres}</p>
                            </div>
                            <div>
                                <p>Длительность:</p>
                                <p>{updateMovie.runtime} мин.</p>
                            </div>
                        </div>

                        <div className={classes.movieActors}>
                            <h3>В главных ролях:</h3>
                            {actors(5).map(actor => <p>{actor}</p>)}
                        </div>

                    </div>
                </div>


            </div>

            <div className={classes.moviePlot}>
                <h2>Описание</h2>
                <p>{updateMovie.plot}</p>
            </div>
        </div>
    );
};

export default MovieBlock;