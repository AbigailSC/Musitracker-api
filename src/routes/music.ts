import express from 'express';
import {
  SearchTitle,
  SearchTitleById,
  SearchByAlbum,
  SearchByArtist,
  SimilarArtists,
  chartTracks,
  topPlaylists,
  getGenres,
  searchByGenre,
  getPodcast,
  GetArtistInfo,
  getTopTracksByArtist,
  trendingArtists,
  playlistById
} from '../controllers/musicController';
// import { TokenValidation } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/search', SearchTitle);

router.get('/title/:idTitle', SearchTitleById);

router.get('/album/:idAlbum', SearchByAlbum);

router.get('/artist/:idArtist', GetArtistInfo);

router.get('/artist/:idArtist/topTracks', getTopTracksByArtist);

router.get('/artist/:idArtist/albums/:page', SearchByArtist);

router.get('/related/:idArtist', SimilarArtists);

router.get('/trending', chartTracks);

router.get('/trending/artists', trendingArtists);

router.get('/topPlaylist', topPlaylists);

router.get('/playlist/:playlistId', playlistById);

router.get('/genres', getGenres);

router.get('/genres/:genre', searchByGenre);

router.get('/podcasts', getPodcast);

export default router;
