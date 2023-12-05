import "./index.css"
import axios from "axios";
import {useEffect, useState} from "react";
import MovieBlock from "./components/movie_block/movieBlock";
import MovieListElement from "./components/movie_list_element/movieListElement";
import MovieList from "./components/movie_list/movieList";
import MovieService from "./API/MovieService";
import Header from "./components/header/header";
import MainBlock from "./components/main_block/mainBlock";
import CreateOrEditMovieBlock from "./components/create_movie_block/createOrEditMovieBlock";

function App() {


  return (
    <div className="App">
        <Header title={"Фильмотека"} author={"Мухаметдинов С.Р."}></Header>
        <MainBlock></MainBlock>
    </div>
  );
}

export default App;
