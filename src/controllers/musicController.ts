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
  picture_xl: string;
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
  record_type: string;
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
  picture_xl: string;
  nb_album?: number;
  nb_fan?: number;
}

interface IPlaylist {
  id: number;
  title: string;
  nb_tracks: number;
  picture_xl: string;
  tracklist: string;
  creation_date: string;
  user: IPlaylistCreator;
}

interface IPlaylistCreator {
  id: number;
  name: string;
}

interface IGenre {
  id: number;
  name: string;
  picture_xl: string;
}

interface IGenreTracks {
  id: number;
  name: string;
  picture_xl: string;
  tracklist: string;
}

interface IPodcast {
  id: number;
  title: string;
  description: string;
  fans: number;
  link: string;
  picture_xl: string;
}

interface ITopTrack {
  id: number;
  title: string;
  duration: number;
  rank: number;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_xl: string;
  };
  preview: string;
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
          picture: elemento.artist.picture_xl
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
        picture_xl: apiData.artist.picture_xl
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
      record_type: apiData.record_type,
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
        picture_xl: apiData.artist.picture_xl
      },
      tracks: apiData.tracks.data.map((elem: ITitle) => {
        return {
          id: elem.id,
          title: elem.title,
          link: elem.link,
          duration: elem.duration,
          preview: elem.preview,
          artist: {
            id: elem.artist.id,
            name: elem.artist.name,
            link: elem.artist.link,
            picture_xl: elem.artist.picture_xl
          },
          album: {
            id: elem.album.id,
            title: elem.album.title,
            cover_big: elem.album.cover_big,
            type: elem.album.type
          }
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

export const GetArtistInfo: RequestHandler = async (req, res) => {
  const { idArtist } = req.params;
  const apiData = await axios.get(`https://api.deezer.com/artist/${idArtist}`);
  const artistInfo = {
    id: apiData.data.id,
    name: apiData.data.name,
    link: apiData.data.link,
    picture_xl: apiData.data.picture_xl,
    nb_album: apiData.data.nb_album,
    nb_fan: apiData.data.nb_fan
  };
  res.json(artistInfo);
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
        picture_xl: artist.picture_xl,
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
    const trendingMusic = apiData.data.data.map((elemento: ITitle) => {
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
          picture: elemento.artist.picture_xl
        },
        album: {
          id: elemento.album.id,
          title: elemento.album.title,
          cover: elemento.album.cover_big,
          type: elemento.album.type
        }
      };
    });
    // sort trendingMusic by rank
    trendingMusic.sort((a: ITitle, b: ITitle) => (a.rank > b.rank ? -1 : 1));
    res.json(trendingMusic);
  } catch (error) {
    console.log(error);
  }
};

export const topPlaylists: RequestHandler = async (_req, res) => {
  try {
    const apiData = await axios.get('https://api.deezer.com/chart/0/playlists');
    const topPlaylists = apiData.data.data.map((element: IPlaylist) => {
      return {
        id: element.id,
        title: element.title,
        nb_tracks: element.nb_tracks,
        picture_xl: element.picture_xl,
        tracklist: element.tracklist,
        creation_date: element.creation_date,
        user: {
          id: element.user.id,
          name: element.user.name
        }
      };
    });
    res.json(topPlaylists);
  } catch (error) {
    console.log(error);
  }
};

export const playlistById: RequestHandler = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const apiData = await axios.get(
      `https://api.deezer.com/playlist/${playlistId}/tracks`
    );
    const playlist = apiData.data.data.map((playlist: ITitle) => {
      return {
        id: playlist.id,
        title: playlist.title,
        link: playlist.link,
        duration: playlist.duration,
        rank: playlist.rank,
        preview: playlist.preview,
        artist: {
          id: playlist.artist.id,
          name: playlist.artist.name,
          link: playlist.artist.link,
          picture: playlist.artist.picture_xl
        },
        album: {
          id: playlist.album.id,
          title: playlist.album.title,
          cover: playlist.album.cover_big,
          type: playlist.album.type
        }
      };
    });
    res.json(playlist);
  } catch (error) {
    console.log(error);
  }
};

export const getGenres: RequestHandler = async (_req, res) => {
  try {
    const apiData = await axios.get('https://api.deezer.com/genre');
    const genres = apiData.data.data.map((genre: IGenre) => {
      return {
        id: genre.id,
        name: genre.name,
        picture: genre.picture_xl
      };
    });
    res.json(genres);
  } catch (error) {
    console.log(error);
  }
};

export const searchByGenre: RequestHandler = async (req, res) => {
  const { genre } = req.params;
  try {
    const apiData = await axios.get(
      `https://api.deezer.com/genre/${genre}/artists`
    );
    const artists = apiData.data.data.map((artist: IGenreTracks) => {
      return {
        id: artist.id,
        name: artist.name,
        link: artist.tracklist,
        picture: artist.picture_xl
      };
    });
    res.json(artists);
  } catch (error) {
    console.log(error);
  }
};

export const getPodcast: RequestHandler = async (_req, res) => {
  try {
    const apiData = await axios.get('https://api.deezer.com/chart/0/podcasts');
    const podcasts = apiData.data.data.map((podcast: IPodcast) => {
      return {
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        link: podcast.link,
        picture: podcast.picture_xl
      };
    });
    res.json(podcasts);
  } catch (error) {
    console.log(error);
  }
};

export const getTopTracksByArtist: RequestHandler = async (req, res) => {
  const { idArtist } = req.params;
  try {
    const apiData = await axios.get(
      `https://api.deezer.com/artist/${idArtist}/top`
    );
    const topTracks = apiData.data.data.map((track: ITopTrack) => {
      return {
        id: track.id,
        title: track.title,
        preview: track.preview,
        duration: track.duration,
        rank: track.rank,
        artist: {
          name: track.artist.name
        },
        album: {
          title: track.album.title,
          cover: track.album.cover_xl
        }
      };
    });
    topTracks.sort((a: ITopTrack, b: ITopTrack) => (a.rank > b.rank ? -1 : 1));
    res.json(topTracks);
  } catch (error) {
    console.log(error);
  }
};

export const trendingArtists: RequestHandler = async (_req, res) => {
  try {
    const apiData = await axios.get('https://api.deezer.com/chart/0/artists');
    const trendingArtists = apiData.data.data.map((artist: IArtist) => {
      return {
        id: artist.id,
        name: artist.name,
        link: artist.link,
        picture_xl: artist.picture_xl
      };
    });
    res.json(trendingArtists);
  } catch (error) {
    console.log(error);
  }
};
