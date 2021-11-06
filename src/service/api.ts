/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

export interface failureObject {
  time: string;
  altitude: string;
  reason: string;
}
export interface coreObject {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}
export interface crewMember {
  crew: string;
  role: string;
}

export interface Launch {
  fairings: {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
  };
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
  static_fire_date_utc: string;
  static_fire_date_unix: string;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: failureObject[];
  details: string;
  crew: crewMember[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: coreObject[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
  id: string;
}

const api = axios.create({
  baseURL: "",
});

export const getNextLaunch = async () => {
  const request = await api.get<Launch>("/next");
  return request.data;
};

export const getLastLaunch = async () => {
  const request = await api.get<Launch>("/latest");
  return request.data;
};

export const getPastLaunchs = async () => {
  const request = await api.get<Launch[]>("/past");
  return request.data;
};

export const getUpcomingLaunchs = async () => {
  const request = await api.get<Launch[]>("/upcoming");
  return request.data;
};
