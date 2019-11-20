import React from 'react';
import {addFavourite} from './actions';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";



class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    componentDidMount() {
        this.getMovie();
    }

    getMovie = () => {
        const { id } = this.props.match.params;
        return fetch(`http://omdbapi.com/?apikey=991a9be3&i=${id}`)
        .then((response) => {
            response.json().then((res) => {
                this.setState({movie: res});
            })
        })
    }

    handleAddToFavourite = () => {
        this.props.addToFavourites(this.state.movie);
    }

    render() {
        const {movie} = this.state;
        return (
            <Box display="flex" justifyContent="center" flexDirection="">
                <div className="movieCard">
                    <div className="padding30">
                        <img src={movie.Poster} alt={movie.Title} className='' />
                    </div>
                    <div>
                        <Box display="flex">
                             <h2>{movie.Title}</h2>
                            <Tooltip title="Add to favourites">
                                <IconButton onClick={this.handleAddToFavourite}>
                                    <StarIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <p>Type: {movie.Type}</p>
                        <p>Year: {movie.Year}</p>
                        <p>Genre: {movie.Genre}</p>
                        <p>Language: {movie.Language}</p>
                        <p>Director: {movie.Director}</p>
                        <p>Released: {movie.Released}</p>
                        <p>Writer: {movie.Writer}</p>
                        <p>imdbRating: {movie.imdbRating}</p>
                        <Button variant="contained" color="primary"><Link to={"/favourites"} className="buttonLink">My favourite movies</Link></Button>
                    </div>
                </div>
            </Box>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addToFavourites: (movie) => {
            dispatch(addFavourite(movie));
        }
    };
};


const detailConnected = connect(
    null,
    mapDispatchToProps
)(Detail);


export default withRouter(detailConnected);