/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import {
  FiCheck,
  FiDatabase,
  FiUser,
  FiX,
  FiHardDrive,
  FiCpu,
  FiDisc,
  FiBookOpen,
  FiCamera,
} from "react-icons/fi";
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
      <div className="titleDiv">
        <h1 className="header-item">Lançamento:{launch?.name}</h1>
        <ul>
          {launch?.crew.map((crewMember) => {
            return (
              <>
                <FiUser title={crewMember.role} size={30} />
                <br />
              </>
            );
          })}
        </ul>
      </div>
      <header>
        <span className="header-item">ID do lançamento: {launch?.id}</span>
        {launch?.success && (
          <span className="header-item">
            Sucesso: {launch?.success ? <FiCheck /> : <FiX />}
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
        <span>Lançado: {launch?.upcoming ? <FiX /> : <FiCheck />}</span>
        {launch?.net && <span>net: {launch.net}</span>}
        <span>Janela: {launch?.window}</span>
        <span>
          Atualizado automaticamente:{" "}
          {launch?.auto_update ? <FiCheck /> : <FiX />}
        </span>
        {launch?.tbd && <span>tbd: {launch.tbd}</span>}
        {launch?.details && (
          <div className="detailDiv">
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
            <FiDatabase title="capsules" className="icon-title" />
            {launch?.capsules.map((capsule) => {
              return (
                <li className="icon-item">
                  <FiHardDrive title={capsule} />
                </li>
              );
            })}
          </ul>
        )}
        {launch?.fairings && (
          <>
            <div className="fairing-div">
              <span>Detalhes da carenagem:</span>
              <ul>
                {launch?.fairings.recovered && (
                  <li>
                    Recuperada:{" "}
                    {launch?.fairings.recovered ? <FiCheck /> : <FiX />}
                  </li>
                )}
                {launch?.fairings.reused && (
                  <li>
                    Reutilizada:{" "}
                    {launch?.fairings.reused ? <FiCheck /> : <FiX />}
                  </li>
                )}
                {launch?.fairings.recovery_attempt && (
                  <li>
                    Tentativa de recuperação:
                    {launch?.fairings.recovery_attempt ? <FiCheck /> : <FiX />}
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
        {launch?.ships && launch?.ships.length > 0 && (
          <>
            <FiCpu title="ships" className="icon-title" />
            <ul>
              {launch?.ships.map((ship) => {
                return (
                  <li>
                    <FiDisc title={ship} className="icon-item" />
                  </li>
                );
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
                        Grades utilizadas:{" "}
                        {core.gridfins ? <FiCheck /> : <FiX />}
                      </li>
                      <li>
                        Pernas utilizadas: {core.legs ? <FiCheck /> : <FiX />}
                      </li>
                      <li>Reutiizado: {core.reused ? <FiCheck /> : <FiX />}</li>
                      <li>
                        Tentativa de pouso:{" "}
                        {core.landing_attempt ? <FiCheck /> : <FiX />}
                      </li>
                      <li>
                        Pouso com sucesso:{" "}
                        {core.landing_success ? <FiCheck /> : <FiX />}
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
        Links úteis:
        {imagesAddress && imagesAddress?.length > 0 && (
          <>
            <FiBookOpen title="images" className="icon-title" />
            <ul>
              {imagesAddress.map((address, index) => {
                if (address) {
                  return (
                    <a href={address} target="_blank" rel="noreferrer">
                      <li className="icon-item">Imagem {index + 1} </li>
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
            <FiCamera title="video" className="icon-title" />
            <li className="icon-item">
              <a href={launch?.links.webcast}>Vídeo</a>
            </li>
          </>
        )}
      </footer>
    </Container>
  );
};

export default LaunchComponent;
