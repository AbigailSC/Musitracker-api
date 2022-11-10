/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { RequestHandler } from 'express';
import axios from 'axios';

interface ITitle {
  id: number;
  title: string;
  link: string;
  duration: number;
  rank: number;
  preview: string;
  track_position?: number;
  release_date?: string;
  type?: string;
  artist: ITitleArtist;
  album: {
    id: number;
    title: string;
    cover_big: string;
    type: string;
  };
  contributors?: ITitleContributor;
}

interface ITitleArtist {
  id: number;
  name: string;
  link: string;
  picture_big: string;
}

interface ITitleContributor {
  id: number;
  name: string;
  link: string;
  picture_big: string;
  role: string;
}

interface IAlbum {
  id: number;
  title: string;
  link: string;
  cover_big: string;
  genres: IAlbumGenres;
  label: string;
  tracks_number: string;
  duration_total: number;
  release_date: string;
  tracklist: string;
  contributors: ITitleContributor;
  artist: ITitleArtist;
  tracks: IAlbumTracks;
}

interface IAlbumGenres {
  id: number;
  name: string;
}

interface IAlbumTracks {
  id: number;
  title: string;
  link: string;
  duration: number;
  preview: string;
}

interface IArtistalbum {
  id: number;
  title: string;
  link: string;
  cover_big: string;
  genre_id: number;
  fans: number;
  release_date: string;
  record_type: string;
  type: string;
}

interface IArtist {
  id: number;
  name: string;
  link: string;
  picture_big: string;
  nb_album: number;
  nb_fan: number;
}

export const SearchTitle: RequestHandler = async (req, res) => {
  const { title } = req.query;
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const apiCall = await axios.get(`https://api.deezer.com/search?q=${title}`);
    const apiData = apiCall.data.data?.map((elemento: ITitle) => {
      return {
        id: elemento.id,
        title: elemento.title,
        link: elemento.link,
        duration: elemento.duration,
        rank: elemento.rank,
        preview: elemento.preview,
        artist: {
          id: elemento.artist.id,
          name: elemento.artist.name,
          link: elemento.artist.link,
          picture: elemento.artist.picture_big
        },
        album: {
          id: elemento.album.id,
          title: elemento.album.title,
          cover: elemento.album.cover_big,
          type: elemento.album.type
        }
      };
    });
    res.json(apiData);
  } catch (error) {
    console.log(error);
  }
};

export const SearchTitleById: RequestHandler = async (req, res) => {
  const { idTitle } = req.params;
  try {
    const apiCall = await axios.get(`https://api.deezer.com/track/${idTitle}`);
    const apiData = apiCall.data;
    const infoTitleTrack: ITitle = {
      id: apiData.id,
      title: apiData.title,
      link: apiData.link,
      duration: apiData.duration,
      rank: apiData.rank,
      preview: apiData.preview,
      track_position: apiData.track_position,
      release_date: apiData.release_date,
      type: apiData.type,
      artist: {
        id: apiData.id,
        name: apiData.artist.name,
        link: apiData.artist.link,
        picture_big: apiData.artist.picture_big
      },
      album: {
        id: apiData.album.id,
        title: apiData.album.title,
        cover_big: apiData.album.cover_big,
        type: apiData.album.type
      },
      contributors: apiData.contributors.map((elem: ITitleContributor) => {
        return {
          id: elem.id,
          name: elem.name,
          link: elem.link,
          picture_big: elem.picture_big,
          role: elem.role
        };
      })
    };
    res.json(infoTitleTrack);
  } catch (error) {
    console.log(error);
  }
};

export const SearchByAlbum: RequestHandler = async (req, res) => {
  const { idAlbum } = req.params;
  try {
    const apiCall = await axios.get(`https://api.deezer.com/album/${idAlbum}`);
    const apiData = apiCall.data;
    const infoAlbum: IAlbum = {
      id: apiData.id,
      title: apiData.title,
      link: apiData.link,
      cover_big: apiData.cover_big,
      genres: apiData.genres.data.map((ele: IAlbumGenres) => {
        return {
          id: ele.id,
          name: ele.name
        };
      }),
      label: apiData.label,
      tracks_number: apiData.tracks_number,
      release_date: apiData.release_date,
      tracklist: apiData.tracklist,
      duration_total: apiData.duration,
      contributors: apiData.contributors.map((elem: ITitleContributor) => {
        return {
          id: elem.id,
          name: elem.name,
          link: elem.link,
          picture_big: elem.picture_big,
          role: elem.role
        };
      }),
      artist: {
        id: apiData.id,
        name: apiData.artist.name,
        link: apiData.artist.link,
        picture_big: apiData.artist.picture_big
      },
      tracks: apiData.tracks.data.map((elem: IAlbumTracks) => {
        return {
          id: elem.id,
          title: elem.title,
          link: elem.link,
          duration: elem.duration,
          preview: elem.preview
        };
      })
    };
    res.json(infoAlbum);
  } catch (error) {
    console.log(error);
  }
};

export const SearchByArtist: RequestHandler = async (req, res) => {
  const { idArtist, page } = req.params;
  try {
    let artistData;
    switch (Number(page)) {
      case 1:
        artistData = await axios.get(
          `https://api.deezer.com/artist/${idArtist}/albums`
        );
        break;
      case 2:
        artistData = await axios.get(
          `https://api.deezer.com/artist/${idArtist}/albums?index=25`
        );
        break;
      case 3:
        artistData = await axios.get(
          `https://api.deezer.com/artist/${idArtist}/albums?index=50`
        );
        break;
      default:
        artistData = {
          data: []
        };
    }
    // const pagesLength = Math.ceil(artistData.data.total / 25);
    // const nextPage = artistData.data.data.next !== undefined ? false : true;
    const apiData = artistData.data.data?.map((album: IArtistalbum) => {
      return {
        id: album.id,
        title: album.title,
        link: album.link,
        cover_big: album.cover_big,
        genre_id: album.genre_id,
        fans: album.fans,
        release_date: album.release_date,
        record_type: album.record_type,
        type: album.type
      };
    });
    const artistAlbums = {
      apiData,
      total: artistData.data.total,
      next: artistData.data.next || null,
      prev: artistData.data.prev || null
    };
    res.json(artistAlbums);
  } catch (error) {
    console.log(error);
  }
};

export const SimilarArtists: RequestHandler = async (req, res) => {
  const { idArtist } = req.params;
  try {
    const apiData = await axios.get(
      `https://api.deezer.com/artist/${idArtist}/related`
    );
    const similarArtists = apiData.data.data.map((artist: IArtist) => {
      return {
        id: artist.id,
        name: artist.name,
        link: artist.link,
        picture_big: artist.picture_big,
        nb_album: artist.nb_album,
        nb_fan: artist.nb_fan
      };
    });
    res.json(similarArtists);
  } catch (error) {
    console.log(error);
  }
};

export const chartTracks: RequestHandler = async (_req, res) => {
  try {
    const apiData = await axios.get('https://api.deezer.com/chart/0/tracks');
    const cataChart = apiData.data.data.map((elemento: ITitle) => {
      return {
        id: elemento.id,
        title: elemento.title,
        link: elemento.link,
        duration: elemento.duration,
        rank: elemento.rank,
        preview: elemento.preview,
        artist: {
          id: elemento.artist.id,
          name: elemento.artist.name,
          link: elemento.artist.link,
          picture: elemento.artist.picture_big
        },
        album: {
          id: elemento.album.id,
          title: elemento.album.title,
          cover: elemento.album.cover_big,
          type: elemento.album.type
        }
      };
    });
    res.json(cataChart);
  } catch (error) {
    console.log(error);
  }
};
