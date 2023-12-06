import React, {useState} from 'react';
import classes from "./createOrEditMovieBlock.module.css";

const CreateOrEditMovieBlock = (props) => {

    const [movie, setMovie] = useState(props.movie);
    const [errors, setErrors] = useState({});

    const toggleGenre = (genre) => {
        const updatedGenres = movie.genres.includes(genre)
            ? movie.genres.filter(item => item !== genre)
            : [...movie.genres, genre];

        setMovie(prevMovie => ({
            ...prevMovie,
            genres: updatedGenres
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            genres:  '',
        }));
    }

    const saveMovie = () => {

        const inputErrors = {};
        if (movie.title.trim() === '')
            inputErrors.title = 'Введите название фильма';
        if (movie.year.trim() === '')
            inputErrors.year = 'Введите год выпуска';
        if(movie.plot.trim() === '')
            inputErrors.plot = 'Введите описание';
        if(movie.runtime.trim() === '')
            inputErrors.runtime = 'Введите длительность';
        if(movie.actors.trim() === '')
            inputErrors.actors = 'Введите актеров';
        if(movie.director.trim() === '')
            inputErrors.director = 'Введите режиссера';
        if(movie.genres.length === 0)
            inputErrors.genres = 'Выберите хотя бы один жанр';

        // Проверка наличия ошибок перед сохранением
        if (Object.keys(inputErrors).length === 0) {
            props.onSave(movie);
        } else {
            setErrors({main:'Введите все обязательные поля!', ...inputErrors});
        }
    };


    // Функции для проверки введенных данных и установки ошибок
    const handleTitleChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            title: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            title: value.trim() === '' ? 'Введите название фильма' : '',
        }));
    };
    const handleYearChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            year: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            year: value.trim() === '' ? 'Введите год выпуска' : '',
        }));
    };

    const handlePlotChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            plot: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            plot: value.trim() === '' ? 'Введите описание' : '',
        }));
    };

    const handleRuntimeChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            runtime: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            runtime: value.trim() === '' ? 'Введите длительность' : '',
        }));
    };

    const handleActorsChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            actors: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            actors: value.trim() === '' ? 'Введите актеров' : '',
        }));
    };

    const handleDirectorChange = (event) => {
        const { value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            director: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            director: value.trim() === '' ? 'Введите режиссера' : '',
        }));
    };


    return (
        <div className={classes.block}>
            <h2>Редактирование / Создание</h2>
            <div className={classes.inputData}>
                <p>Название фильма</p>
                <input
                    placeholder={'Введите название фильма'}
                    value={movie.title}
                    onChange={handleTitleChange}
                />
                {errors.title && <p className={classes.error}>{errors.title}</p>}

                <p>Год выпуска</p>
                <input
                    type={"number"}
                    placeholder={'Введите год выпуска'}
                    value={movie.year}
                    onChange={handleYearChange}
                />
                {errors.year && <p className={classes.error}>{errors.year}</p>}

                <p>Описание</p>
                <div>
                    <textarea
                        placeholder={'Введите описание фильма'}
                        value={movie.plot}
                        onChange={handlePlotChange}
                    />
                </div>
                {errors.plot && <p className={classes.error}>{errors.plot}</p>}


                <p>Укажите ссылку на обложку</p>
                <input
                    placeholder={'Введите ссылку на обложку'}
                    value={movie.posterUrl}
                    onChange={event => setMovie({...movie, posterUrl: event.target.value})}
                />

                <p>Длительность фильма (в минутах)</p>
                <input
                    type={"number"}
                    placeholder={'Введите длительность фильма'}
                    value={movie.runtime}
                    onChange={handleRuntimeChange}
                />
                {errors.runtime && <p className={classes.error}>{errors.runtime}</p>}


                <p>Выберите жанры фильма</p>
                <div className={classes.genresList}>
                    {props.genresList.map(genre =>
                        <div>
                            <input
                                type={'checkbox'}
                                name={genre}
                                checked={movie.genres.includes(genre)}
                                onChange={() => toggleGenre(genre)}
                            />
                            <label htmlFor={genre}>{genre}</label>
                        </div>)
                    }
                </div>
                {errors.genres && <p className={classes.error}>{errors.genres}</p>}

                <p>Список актеров</p>
                <input
                    placeholder={'Введите актеров (через ,)'}
                    value={movie.actors}
                    onChange={handleActorsChange}
                />
                {errors.actors && <p className={classes.error}>{errors.actors}</p>}

                <p>Режиссер</p>
                <input
                    placeholder={'Введите режиссеров (через ,)'}
                    value={movie.director}
                    onChange={handleDirectorChange}
                />
                {errors.director && <p className={classes.error}>{errors.director}</p>}
            </div>

            <div className={classes.footer}>
                {errors.main && <p className={classes.error}>{errors.main}</p>}
                    <button className={classes.cancelBtn} onClick={props.onCancel}>Отменить</button>
                    <button className={classes.saveBtn} onClick={saveMovie}>Сохранить</button>
            </div>

        </div>
    );
};

export default CreateOrEditMovieBlock;