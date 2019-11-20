import React from 'react';
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {removeFavourite} from "./actions";


function favourites(props) {

    const handleRemove = (movie) => {
        props.removeFromFavourites(movie);
    }

    return (
        <Box display="flex" justifyContent="center" flexDirection="">
            <h2>My favourite movies</h2>
            <ul>
            {props.favouriteMovies.map( movie => {
                return (
                    <li key={movie.imdbID}>
                        <div className="movieCard">
                            <Box display="flex">
                                <h2>{movie.Title}</h2>
                                <Tooltip title="Remove from favourites">
                                    <div><Button onClick={() => handleRemove(movie)} variant="contained" color="secondary">Remove</Button></div>
                                </Tooltip>
                                <div><Button variant="contained" color="primary"><Link to={`/detail/${movie.imdbID}`} className="buttonLink">Details</Link></Button></div>
                            </Box>
                        </div>
                    </li>
                )
            } )}
            </ul>

        </Box>
    );
}


const mapStateToProps = (store) => {
    return {
        favouriteMovies: store
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeFromFavourites: (movie) => {
            dispatch(removeFavourite(movie));
        }
    };
};

const favouritesConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(favourites);

export default favouritesConnected;



