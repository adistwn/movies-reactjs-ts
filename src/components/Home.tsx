import { useEffect, useState } from "react";
import { Movie } from "./Movie.type";
import Card from "./Card";
import Sidebar from "./Sidebar";
import axios from "../axios";
const apiKey = "92e9989ef70043d0a0802f5bab0bb5dc";

const Home = () => {
    const [sidebar, setSidebar] = useState(true);
    const [sortBy, setSortBy] = useState("streaming");
    const [menu, setMenu] = useState("popular");
    const [search, setSearch] = useState("");
    const [movieList, setMovieList] = useState<Movie[]>([]);

    /**
     * Get Movies
     */
    const getMovies = (currentMenu: string, currentSort: string) => {
        setSearch("");
        let url = "";

        if (currentMenu === "popular") {
            if (currentSort === "rent") {
                url = `discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1&watch_region=ID&with_watch_monetization_types=rent`;
            } else if (currentSort === "theaters") {
                url = `movie/now_playing?api_key=${apiKey}&page=1&region=ID`;
            } else {
                url = `movie/popular?api_key=${apiKey}&page=1&region=ID`;
            }
        }

        if (currentMenu === "trending") {
            url = `trending/all/day?api_key=${apiKey}`;
        }

        if (currentMenu === "free") {
            url = `discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1&watch_region=ID&with_watch_monetization_types=free`;
        }

        if (url !== "") {
            axios
                .get(url)
                .then((resp) => {
                    if (
                        resp.status === 200 &&
                        resp.data.results !== undefined
                    ) {
                        setMovieList(resp.data.results);
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    const handleSearch = (keyword: string) => {
        setSearch(keyword);
        setMenu("");

        if (keyword.length > 1) {
            axios
                .get(
                    `search/movie?api_key=${apiKey}&page=1&region=ID&query=${keyword}`
                )
                .then((resp) => {
                    if (
                        resp.status === 200 &&
                        resp.data.results !== undefined
                    ) {
                        setMovieList(resp.data.results);
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    /**
     * Handle Set Menu
     */
    const handleSetMenu = (choose: string) => {
        if (choose !== menu) {
            setMenu(choose);
            getMovies(choose, sortBy);
        }
    };

    /**
     * Handle Set Sortby
     */
    const handleSetSortBy = (choose: string) => {
        if (choose !== menu) {
            setSortBy(choose);
            getMovies(menu, choose);
        }
    };

    // ComponentDidMount
    useEffect(() => {
        getMovies(menu, sortBy);
    }, []);

    return (
        <>
            <Sidebar
                toggleSidebar={sidebar}
                currentMenu={menu}
                onSetMenu={handleSetMenu}
            />
            <div
                className={"p-4 " + (sidebar ? "active-main-content" : "")}
                id="main-content"
            >
                <div className="col-md-12 mb-3">
                    <button
                        className="btn btn-danger"
                        id="button-toggle"
                        onClick={() => setSidebar((val) => !val)}
                    >
                        <i className="bi bi-list" />
                    </button>
                </div>
                <div className="row mb-3">
                    <div className="col-md-8">
                        <input
                            value={search}
                            type="text"
                            className="form-control"
                            placeholder="Searching..."
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4" hidden={menu !== "popular"}>
                        <div className="btn-group" role="group">
                            <div
                                className={
                                    sortBy === "streaming"
                                        ? "btn btn-warning"
                                        : "btn btn-secondary"
                                }
                                onClick={() => handleSetSortBy("streaming")}
                            >
                                Streaming
                            </div>
                            <div
                                className={
                                    sortBy === "rent"
                                        ? "btn btn-warning"
                                        : "btn btn-secondary"
                                }
                                onClick={() => handleSetSortBy("rent")}
                            >
                                For Rent
                            </div>
                            <div
                                className={
                                    sortBy === "theaters"
                                        ? "btn btn-warning"
                                        : "btn btn-secondary"
                                }
                                onClick={() => handleSetSortBy("theaters")}
                            >
                                In Theaters
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-4 row-cols-xl-6 g-4">
                    {movieList.map((movie) => {
                        return <Card key={movie.id} {...movie} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
