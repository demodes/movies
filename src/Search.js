import React from 'react';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';



export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            lastSearch: '',
            movies: [],
            page: 1,
            loadMore: false,
            isLoading: false,
            notFound: false
        };
        this.getData = this.getData.bind(this);
    }


    getData() {
        this.setState({isLoading: true});
        return fetch(`http://omdbapi.com/?apikey=991a9be3&s=${this.state.inputValue}&page=${this.state.page}`)
            .then((response) => {
                response.json().then((res) => {
                    if (res.Response === "False") {
                        this.setState({notFound: true});
                    } else {
                        if (this.state.inputValue === this.state.lastSearch) {
                            this.setState({movies: [...this.state.movies, ...res.Search]});
                        } else {
                            this.setState({movies: res.Search});
                            this.setState({lastSearch: this.state.inputValue});
                        }
                        this.setState({notFound: false});
                        this.setState({isLoading: false});
                        if (res.totalResults - (this.state.page * 10) > 0) {
                            this.setState({loadMore: true, page: this.state.page + 1});
                        } else {
                            this.setState({loadMore: false, page: 1});
                        }
                    }
                });
            });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value.trim()
        });
    }

    render() {
        return (
        <Container fixed>
            <Box display="flex" justifyContent="flex-end"><Button variant="contained" color="primary"><Link to={"/favourites"} className="buttonLink">My favourite movies</Link></Button></Box>
            <Box display="flex" justifyContent="center">
                <div>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            value={this.state.inputValue}
                            onChange={evt => this.updateInputValue(evt)}
                            id="standard-basic"
                            label="search"
                            margin="normal"
                        />

                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <IconButton onClick={this.getData}>
                                <SearchIcon/>
                            </IconButton>
                        </Box>
                    </Box>

                    {this.state.isLoading && !this.state.notFound && (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                            <p> Loading...</p>
                        </Box>
                    )}
                    {this.state.notFound && (
                        <Box display="flex" justifyContent="center">
                            <p>Sorry, but we can not found any movies</p>
                        </Box>
                    )}

                    <Grid container spacing={10}>
                        {this.state.movies.map( movie =>{
                            if (!movie.Poster || movie.Poster === 'N/A') {
                                movie.Poster = `https://dummyimage.com/300x448/2c96c7/ffffff.png&text=No+Image`;
                            }
                            return (
                                <Grid item sm={12} md={6} xl={4} key={movie.imdbID}>
                                    <Box display="flex">
                                        <div className="padding10">
                                            <img src={movie.Poster} alt={movie.Title} className='imgMovie' />
                                        </div>
                                        <div>
                                            <h3>{movie.Title}</h3>
                                            <p>Type: {movie.Type}</p>
                                            <p>Year: {movie.Year}</p>
                                            <Button variant="contained" color="primary"><Link to={`/detail/${movie.imdbID}`} className="buttonLink">Details</Link></Button>
                                        </div>
                                    </Box>
                                </Grid>
                            )}
                        )}
                    </Grid>

                    <Box display="flex" justifyContent="center">
                        {!!this.state.movies.length && this.state.loadMore && (
                            <Button onClick={this.getData} variant="contained" color="primary">Load More Movies</Button>
                        )}
                    </Box>
                </div>
            </Box>
        </Container>
        );
    }
}

