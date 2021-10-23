/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Launch } from "../../service/api";
import {
  getArticlesInLaunch,
  getImagesInLaunch,
  imageLink,
} from "../../service/services";
import { dateFormat } from "../../service/dateService";

interface Props {
  launch: Launch | undefined;
}

export const LaunchComponent = (props: Props) => {
  const { launch } = props;
  const [imagesAddress, setImagesAddress] = useState<string[]>();
  const [articlesAddress, setArticlesAddress] = useState<string[]>();
  useEffect(() => {
    const images = getImagesInLaunch(launch);
    setImagesAddress(images);
    const articles = getArticlesInLaunch(launch);
    setArticlesAddress(articles);
  }, [launch]);

  return (
    <Container>
      <h1 className="header-item">Lançamento:{launch?.name}</h1>
      <header>
        <span className="header-item">ID do lançamento: {launch?.id}</span>
        {launch?.success && (
          <span className="header-item">
            Sucesso: {launch?.success ? "Sim" : "Não"}
          </span>
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
      <body>
        <span>Plataforma de lançamento: {launch?.launchpad}</span>
        {launch?.details && (
          <div>
            <label htmlFor="detailSpan">Detalhes do lançamento</label>
            <span className="detailSpan">{launch?.details}</span>
          </div>
        )}
        {launch?.failures.length !== 0 && (
          <ul>
            Falhas:
            {launch?.failures.map((failure) => {
              return <li>{failure}</li>;
            })}
          </ul>
        )}
        {launch?.capsules.length !== 0 && (
          <ul>
            Cápsulas:
            {launch?.capsules.map((capsule) => {
              return <li>{capsule}</li>;
            })}
          </ul>
        )}
        {launch?.crew.length !== 0 && (
          <>
            <span>Tripulação:</span>
            <ul>
              {launch?.crew.map((crewMember) => {
                return <li>{crewMember.role}</li>;
              })}
            </ul>
          </>
        )}
      </body>
      <footer>
        Links úteis:
        {imagesAddress && imagesAddress?.length > 0 && (
          <>
            <span>Imagens:</span>
            <ul>
              {imagesAddress.map((address, index) => {
                if (address) {
                  return (
                    <a href={address} target="_blank" rel="noreferrer">
                      <li>Imagem {index + 1} </li>
                    </a>
                  );
                }
                return "";
              })}
            </ul>
          </>
        )}
        {articlesAddress && articlesAddress?.length > 0 && (
          <>
            <span>Artigos:</span>
            <ul>
              {articlesAddress.map((article, index) => {
                if (article) {
                  return (
                    <a href={article} target="_blank" rel="noreferrer">
                      <li>Artigo {index}</li>
                    </a>
                  );
                }
                return "";
              })}
            </ul>
          </>
        )}
        {launch?.links.presskit && (
          <>
            <span>Kit de imprensa:</span>
            <li>{launch?.links.presskit}</li>
          </>
        )}
        {launch?.links.webcast && (
          <>
            <span>Vídeo do lançamento:</span>
            <li>
              <a href={launch?.links.webcast}>Vídeo</a>
            </li>
          </>
        )}
      </footer>
    </Container>
  );
};

export default LaunchComponent;
