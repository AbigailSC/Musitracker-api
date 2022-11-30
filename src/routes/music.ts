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
  getPodcast
} from '../controllers/musicController';
// import { TokenValidation } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/search', SearchTitle);

router.get('/title/:idTitle', SearchTitleById);

router.get('/album/:idAlbum', SearchByAlbum);

router.get('/artist/:idArtist/:page', SearchByArtist);

router.get('/related/:idArtist', SimilarArtists);

router.get('/chart', chartTracks);

router.get('/topPlaylist', topPlaylists);

router.get('/genres', getGenres);

router.get('/genres/:genre', searchByGenre);

router.get('/podcasts', getPodcast);

export default router;
