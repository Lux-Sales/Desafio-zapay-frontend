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
        <span>Lançado: {launch?.upcoming ? "Não" : "Sim"}</span>
        {launch?.net && <span>net: {launch.net}</span>}
        <span>Janela: {launch?.window}</span>
        <span>
          Atualizado automaticamente: {launch?.auto_update ? "Sim" : "Não"}
        </span>
        {launch?.tbd && <span>tbd: {launch.tbd}</span>}
        {launch?.details && (
          <div>
            <label htmlFor="detailSpan">Detalhes do lançamento:</label>
            <br />
            <span className="detailSpan">{launch?.details}</span>
          </div>
        )}
        {launch?.failures && launch.failures.length !== 0 && (
          <>
            <span>Falhas:</span>
            <ol>
              {launch?.failures.map((failure) => {
                return (
                  <li>
                    {failure.time && (
                      <>
                        <span>tempo: {failure.time}</span> <br />
                      </>
                    )}

                    {failure.altitude && (
                      <>
                        <span>altitude:{failure.altitude}</span> <br />
                      </>
                    )}
                    {failure.reason && <span>razão: {failure.reason}</span>}
                  </li>
                );
              })}
            </ol>
          </>
        )}
        {launch?.capsules.length !== 0 && (
          <ul>
            Cápsulas:
            {launch?.capsules.map((capsule) => {
              return <li>{capsule}</li>;
            })}
          </ul>
        )}
        {launch?.fairings && (
          <>
            <span>Detalhes da carenagem:</span>
            <ul>
              {launch?.fairings.recovered && (
                <li>
                  Recuperada: {launch?.fairings.recovered ? "Sim" : "Não"}
                </li>
              )}
              {launch?.fairings.reused && (
                <li>Reutilizada: {launch?.fairings.reused ? "Sim" : "Não"}</li>
              )}
              {launch?.fairings.recovery_attempt && (
                <li>
                  Tentativa de recuperação:
                  {launch?.fairings.recovery_attempt ? "Sim" : "Não"}
                </li>
              )}
              {launch.fairings.ships && launch.fairings.ships.length > 0 && (
                <>
                  <span>Barcos:</span>
                  <ul>
                    {launch.fairings.ships.map((ship) => {
                      return <li>{ship}</li>;
                    })}
                  </ul>
                </>
              )}
            </ul>
          </>
        )}
        {launch?.crew.length !== 0 && (
          <>
            <span>Tripulação:</span>
            <ul>
              {launch?.crew.map((crewMember) => {
                return (
                  <>
                    <li>id: {crewMember.crew}</li>
                    <li>função: {crewMember.role}</li>
                    <br />
                  </>
                );
              })}
            </ul>
          </>
        )}
        <span>Data em diferentes formatos:</span>
        <span>Precisão da data: {launch?.date_precision}</span>
        <ul>
          <li>{launch?.date_local}</li>
          <li>{launch?.date_unix}</li>
          <li>{launch?.date_utc}</li>
          {launch?.static_fire_date_unix && (
            <li>launch?.static_fire_date_unix</li>
          )}
          {launch?.static_fire_date_utc && (
            <li>launch?.static_fire_date_utc</li>
          )}
        </ul>
        {launch?.ships && launch?.ships.length > 0 && (
          <>
            <span>Barcos inclusos:</span>
            <ul>
              {launch?.ships.map((ship) => {
                return <li>{ship}</li>;
              })}
            </ul>
          </>
        )}
        {launch?.payloads && (
          <>
            <span>Cargas úteis:</span>
            <ul>
              {launch?.payloads.map((payload) => {
                return <li>{payload}</li>;
              })}
            </ul>
          </>
        )}
        {launch?.cores && launch.cores.length > 1 && launch?.cores[0].core && (
          <div>
            <h3>Núcleos</h3>
            <ul>
              {launch?.cores.map((core) => {
                return (
                  <>
                    <h4> Id: {core.core}</h4>
                    <ul>
                      <li>Voo: {core.flight}</li>
                      <li>
                        Grades utilizadas: {core.gridfins ? "Sim" : "Não"}
                      </li>
                      <li>Pernas utilizadas: {core.legs ? "Sim" : "Não"}</li>
                      <li>Reutiizado: {core.reused ? "Sim" : "Não"}</li>
                      <li>
                        Tentativa de pouso:{" "}
                        {core.landing_attempt ? "Sim" : "Não"}
                      </li>
                      <li>
                        Pouso com sucesso:{" "}
                        {core.landing_success ? "Sim" : "Não"}
                      </li>
                      <li>Tipo de pouso: {core.landing_type}</li>
                      <li>Solo: {core.landpad}</li>
                    </ul>
                    <br />
                  </>
                );
              })}
            </ul>
          </div>
        )}
      </body>
      <footer>
        {launch?.launch_library_id && (
          <span> Id na biblioteca: {launch?.launch_library_id}</span>
        )}
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
