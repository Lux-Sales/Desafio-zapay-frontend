/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

export interface Launch {
  id: string;
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string;
      launch: string;
      media: string;
      recovery: string;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  rocket: string;
  success: boolean;
  failures: string[];
  details: string;
  crew: string[];
  capsules: string[];
  launchpad: string;
  flight_number: string;
  name: string;
  date_utc: string;
}
const api = axios.create({
  baseURL: "https://api.spacexdata.com/v5/launches",
});

export const getNextLaunch = async () => {
  const request = await api.get<Launch>("/next");
  return request.data;
};

export const getLastLaunch = async () => {
  const request = await api.get<Launch>("/latest");
  return request.data;
};
