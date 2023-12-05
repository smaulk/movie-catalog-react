import React, {useState} from 'react';
import classes from "./createOrEditMovieBlock.module.css";

const CreateOrEditMovieBlock = (props) => {

    const [movie, setMovie] = useState(props.movie);

    const toggleGenre = (genre) => {
        const updatedGenres = movie.genres.includes(genre)
            ? movie.genres.filter(item => item !== genre)
            : [...movie.genres, genre];

        setMovie(prevMovie => ({
            ...prevMovie,
            genres: updatedGenres
        }));
    }

    const saveMovie = () => props.onSave(movie);

    return (
        <div className={classes.block}>
            <h2>Редактирование / Создание</h2>
            <div className={classes.inputData}>
                <p>Название фильма</p>
                <input
                    placeholder={'Введите название фильма'}
                    value={movie.title}
                    onChange={event => setMovie({...movie, title: event.target.value})}
                />
                <p>Год выпуска</p>
                <input
                    placeholder={'Введите год выпуска'}
                    value={movie.year}
                    onChange={event => setMovie({...movie, year: event.target.value})}
                />
                <p>Описание</p>
                <div>
                    <textarea
                        placeholder={'Введите описание фильма'}
                        value={movie.plot}
                        onChange={event => setMovie({...movie, plot: event.target.value})}
                    />
                </div>
                <p>Укажите ссылку на обложку</p>
                <input
                    placeholder={'Введите ссылку на обложку'}
                    value={movie.posterUrl}
                    onChange={event => setMovie({...movie, posterUrl: event.target.value})}
                />
                <p>Длительность фильма (в минутах)</p>
                <input
                    placeholder={'Введите длительность фильма'}
                    value={movie.runtime}
                    onChange={event => setMovie({...movie, runtime: event.target.value})}
                />

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

                <p>Список актеров</p>
                <input
                    placeholder={'Введите актеров (через ,)'}
                    value={movie.actors}
                    onChange={event => setMovie({...movie, actors: event.target.value})}
                />
                <p>Режиссер</p>
                <input
                    placeholder={'Введите режиссеров (через ,)'}
                    value={movie.director}
                    onChange={event => setMovie({...movie, director: event.target.value})}
                />
            </div>

            <div className={classes.footer}>
                    <button className={classes.cancelBtn} onClick={props.onCancel}>Отменить</button>
                    <button className={classes.saveBtn} onClick={saveMovie}>Сохранить</button>
            </div>

        </div>
    );
};

export default CreateOrEditMovieBlock;