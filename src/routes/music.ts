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

/**
 * @swagger
 * tags:
 *  name: Music
 *  description: Music endpoint routes
 */

/**
 * @swagger
 * /music/search:
 *  get:
 *    summary: use to search a title by query
 *    tags: [Music]
 *    parameters:
 *      - name: title
 *        in: query
 *        description: Title of album, song or name of artist to search
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                    example: 1880181827
 *                  title:
 *                    type: string
 *                    example: The Feels
 *                  link:
 *                    type: string
 *                    example: https://www.deezer.com/track/1533348982
 *                  rank:
 *                    type: number
 *                    example: 734818
 *                  preview:
 *                    type: string
 *                    example: https://cdns-preview-5.dzcdn.net/stream/c-5355c6f8c53dfda7b3d336452a5b99b0-4.mp3
 *                  artist:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 161553
 *                      name:
 *                        type: string
 *                        example: Twice
 *                      link:
 *                        type: string
 *                        example: https://www.deezer.com/artist/161553
 *                      picture:
 *                        type: string
 *                        example: https://e-cdns-images.dzcdn.net/images/artist/cbda49722c177c2133b748d7a6bf5dc7/1000x1000-000000-80-0-0.jpg
 *                  album:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 268310522
 *                      title:
 *                        type: string
 *                        example: "Formula of Love: O+T=<3"
 *                      cover:
 *                        type: string
 *                        example: https://e-cdns-images.dzcdn.net/images/cover/39443bfe03b4e82da2a4f35ae423cace/500x500-000000-80-0-0.jpg
 *                      type:
 *                        type: string
 *                        example: album
 *
 */

router.get('/search', SearchTitle);

/**
 * @swagger
 * /music/title/{idTitle}:
 *  get:
 *    summary: use to search a title by id
 *    tags: [Music]
 *    parameters:
 *      - name: idTitle
 *        in: path
 *        description: Id of song to search
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Successful request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  example: 1533348982
 *                title:
 *                  type: string
 *                  example: The Feels
 *                link:
 *                  type: string
 *                  example: https://www.deezer.com/track/1533348982
 *                duration:
 *                  type: number
 *                  example: 198
 *                rank:
 *                  type: number
 *                  example: 734818
 *                preview:
 *                  type: string
 *                  example: https://cdns-preview-5.dzcdn.net/stream/c-5355c6f8c53dfda7b3d336452a5b99b0-4.mp3
 *                artist:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 161553
 *                    name:
 *                      type: string
 *                      example: Twice
 *                    link:
 *                      type: string
 *                      example: https://www.deezer.com/artist/161553
 *                    picture_xl:
 *                      type: string
 *                      example: https://e-cdns-images.dzcdn.net/images/artist/cbda49722c177c2133b748d7a6bf5dc7/1000x1000-000000-80-0-0.jpg
 *                album:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 268310522
 *                    title:
 *                      type: string
 *                      example: "Formula of Love: O+T=<3"
 *                    cover_big:
 *                      type: string
 *                      example: https://e-cdns-images.dzcdn.net/images/cover/39443bfe03b4e82da2a4f35ae423cace/500x500-000000-80-0-0.jpg
 *                    type:
 *                      type: string
 *                      example: album
 *                contributors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 161553
 *                      name:
 *                        type: string
 *                        example: Twice
 *                      link:
 *                        type: string
 *                        example: https://www.deezer.com/artist/161553
 *                      picture_big:
 *                        type: string
 *                        example: https://e-cdns-images.dzcdn.net/images/artist/cbda49722c177c2133b748d7a6bf5dc7/1000x1000-000000-80-0-0.jpg
 *                      role:
 *                        type: string
 *                        example: Main
 */

router.get('/title/:idTitle', SearchTitleById);

/**
 * @swagger
 * /music/album/{idAlbum}:
 *  get:
 *    summary: use to search a album by id
 *    tags: [Music]
 *    parameters:
 *      - name: idAlbum
 *        in: path
 *        description: Id of album to search
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Successful request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  example: 268310522
 *                title:
 *                  type: string
 *                  example: "Formula of Love: O+T=<3"
 *                link:
 *                  type: string
 *                  example: "https://www.deezer.com/album/268310522"
 *                cover_big:
 *                  type: string
 *                  example: https://e-cdns-images.dzcdn.net/images/cover/39443bfe03b4e82da2a4f35ae423cace/500x500-000000-80-0-0.jpg
 *                genres:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 16
 *                      name:
 *                        type: string
 *                        example: Música asiática
 *                label:
 *                  type: string
 *                  example: Republic Records - TWICE
 *                record_type:
 *                  type: string
 *                  example: album
 *                release_date:
 *                  type: string
 *                  example: 2021-11-12
 *                tracklist:
 *                  type: string
 *                  example: https://api.deezer.com/album/268310522/tracks
 *                duration_total:
 *                  type: number
 *                  example: 3119
 *                contributors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 161553
 *                      name:
 *                        type: string
 *                        example: Twice
 *                      link:
 *                        type: string
 *                        example: https://www.deezer.com/artist/161553
 *                      picture_big:
 *                        type: string
 *                        example: https://e-cdns-images.dzcdn.net/images/artist/cbda49722c177c2133b748d7a6bf5dc7/1000x1000-000000-80-0-0.jpg
 *                      role:
 *                        type: string
 *                        example: Main
 *                artist:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 161553
 *                    name:
 *                      type: string
 *                      example: Twice
 *                    picture_xl:
 *                      type: string
 *                      example: https://e-cdns-images.dzcdn.net/images/artist/cbda49722c177c2133b748d7a6bf5dc7/1000x1000-000000-80-0-0.jpg
 *                tracks:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 1533348842
 *                      title:
 *                        type: string
 *                        example: Scientist
 *                      link:
 *                        type: string
 *                        example: https://www.deezer.com/track/1533348842
 *                      duration:
 *                        type: number
 *                        example: 194
 *                      preview:
 *                        type: string
 *                        example: https://cdns-preview-c.dzcdn.net/stream/c-cb2c04f44eb560d5982709f440b93e46-4.mp3
 *                      artist:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                            example: 161553
 *                          name:
 *                            type: string
 *                            example: Twice
 *                        album:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: number
 *                              example: 268310522
 *                            title:
 *                              type: string
 *                              example: "Formula of Love: O+T=<3"
 *                            cover:
 *                              type: string
 *                              example: https://e-cdns-images.dzcdn.net/images/cover/39443bfe03b4e82da2a4f35ae423cace/500x500-000000-80-0-0.jpg
 *                            type:
 *                              type: string
 *                              example: album
 */

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
