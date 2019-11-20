import * as t from './actionTypes';

const INITIAL_DATA = []

const Reducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case t.ADD_MOVIE:
            return [
                ...state, action.movie
            ]
        case t.REMOVE_MOVIE:
            return state.filter(movie => movie.imdbID !== action.movie.imdbID);
        default:
            return state
    }
}

export default Reducer;