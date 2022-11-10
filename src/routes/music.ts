import express from 'express';
import {
  SearchTitle,
  SearchTitleById,
  SearchByAlbum,
  SearchByArtist,
  SimilarArtists,
  chartTracks
} from '../controllers/musicController';
import { TokenValidation } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/search', TokenValidation, SearchTitle);

router.get('/title/:idTitle', TokenValidation, SearchTitleById);

router.get('/album/:idAlbum', TokenValidation, SearchByAlbum);

router.get('/artist/:idArtist/:page', TokenValidation, SearchByArtist);

router.get('/related/:idArtist', TokenValidation, SimilarArtists);

router.get('/chart', TokenValidation, chartTracks);

export default router;
