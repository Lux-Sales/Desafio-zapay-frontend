/* eslint-disable import/prefer-default-export */
import { Launch } from "./api";
import * as noImage from "../assets/noImage.png";

export const imageLink = (launch: Launch | undefined) => {
  if (launch?.links.patch.large) {
    return launch?.links.patch.large;
  }
  return noImage.default;
};

export const getImagesInLaunch = (launch: Launch | undefined) => {
  if (launch) {
    const flickrSmallValues = launch.links.flickr.small;
    const flickrOriginalValues = launch.links.flickr.original;
    const patchValue = launch.links.patch.large;
    return [...flickrOriginalValues, ...flickrSmallValues, patchValue].filter(
      (item) => !!item
    );
  }
  return [];
};

export const getArticlesInLaunch = (launch: Launch | undefined) => {
  if (launch) {
    const redditValues = Object.values(launch.links.reddit);
    const onlyNull = redditValues.map((value) => {
      if (value != null) {
        return false;
      }
      return true;
    });
    if (onlyNull) {
      return [];
    }
    return [...redditValues, launch.links.wikipedia, launch.links.article];
  }
  return [];
};
