/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Container } from "./styles";
import { Launch } from "../../service/api";
import { imageLink } from "../../service/imageService";
import { dateFormat } from "../../service/dateService";

interface Props {
  launch: Launch | undefined;
}

export const LaunchComponent = (props: Props) => {
  const { launch } = props;
  return (
    <Container>
      <h1 className="header-item">Lançamento:{launch?.name}</h1>
      <header>
        <span className="header-item">ID do lançamento: {launch?.id}</span>
        {launch?.success && (
          <span className="header-item">Sucesso:{launch?.success}</span>
        )}
        <span className="header-item">Foguete:{launch?.rocket}</span>
        <span className="header-item">
          Lançamento n°:{launch?.flight_number}
        </span>
        <span className="header-item">
          Data de lançamento:{launch?.date_utc && dateFormat(launch?.date_utc)}
        </span>
      </header>
      <img src={imageLink(launch)} alt="" />
      {launch?.details && (
        <div>
          <label htmlFor="detailSpan">Detalhes do lançamento</label>
          <span className="detailSpan">{launch?.details}</span>
        </div>
      )}
    </Container>
  );
};

export default LaunchComponent;
