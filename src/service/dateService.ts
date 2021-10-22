/* eslint-disable import/prefer-default-export */
export const dateFormat = (date: string) => {
  const dateSplited = date.split("T");
  const dateArray = dateSplited[0].split("-");
  const dateString = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  return dateString;
};
