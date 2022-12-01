import { Movie } from "./Movie.type";

const Card = ({ title, poster_path, release_date, vote_average }: Movie) => {

    return (
        <div className="col">
            <div className="card">
                <img
                    src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                    className="card-img-top"
                    alt={title}
                />
                <div className="card-img-overlay text-right">
                    <span className="badge bg-danger font-weight-bold">{vote_average.toFixed(1)}</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted">
                        {new Date(release_date).toDateString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card;