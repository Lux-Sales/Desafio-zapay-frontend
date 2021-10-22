/* eslint-disable import/prefer-default-export */
import { Launch } from "./api";

export const imageLink = (launch: Launch | undefined) => {
  if (launch?.links.patch.large) {
    return launch?.links.patch.large;
  }
  return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tudocelular.com%2Ftech%2Fnoticias%2Fn156948%2Fvirgin-orbit-lanca-foguete-launcher-one.html&psig=AOvVaw1k-zEE-Tqiu8PYyN2Hdtdq&ust=1634938982075000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKi-zr283PMCFQAAAAAdAAAAABAL";
};
