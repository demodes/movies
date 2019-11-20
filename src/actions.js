import * as t from './actionTypes';

export const addFavourite = movie => ({
    type: t.ADD_MOVIE,
    movie
});

export const removeFavourite = movie => ({
    type: t.REMOVE_MOVIE,
    movie
});