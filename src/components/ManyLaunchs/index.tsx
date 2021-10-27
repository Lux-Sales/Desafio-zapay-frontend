import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Launch } from "../../service/api";
import { dateFormat } from "../../service/dateService";
import LaunchComponent from "../Launch";
import { Container } from "./styles";

interface Props {
  launchsArray: Launch[] | undefined;
}

export const ManyLaunchs = (props: Props) => {
  const { launchsArray } = props;
  const [pagedItems, setPagedItems] = useState<Launch[]>([]);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showComponent, setShowComponent] = useState(false);
  const [launch, setLaunch] = useState<Launch | undefined>(undefined);

  useEffect(() => {
    if (launchsArray) {
      setPagesAmount(
        Math.floor(launchsArray?.length / 10 + (launchsArray.length % 10 && 1))
      );
    }
  }, [launchsArray?.length]);

  useEffect(() => {
    if (launchsArray) {
      setPagedItems(
        launchsArray.slice(10 * (currentPage - 1), 10 * currentPage)
      );
    }
  }, [currentPage, pagesAmount]);

  const detail = (launchParam: Launch) => {
    setLaunch(launchParam);
    setShowComponent(true);
  };

  return (
    <>
      {!showComponent && (
        <Container>
          {pagedItems?.map((launchParam) => {
            return (
              <div className="launch-item">
                <header>
                  <span>Id: {launchParam.id}</span>
                  <h3>{launchParam.name}</h3>
                  <span>data: {dateFormat(launchParam.date_utc)}</span>
                </header>
                <footer>
                  <span>Sucesso: {launchParam.success ? "Sim" : "Não"}</span>
                  <button type="button" onClick={() => detail(launchParam)}>
                    Ver mais
                  </button>
                </footer>
              </div>
            );
          })}
          <nav>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage((previous) => previous - 1)}
                  disabled={currentPage - 1 === 0}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: pagesAmount }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      type="button"
                      onClick={() => {
                        if (currentPage !== pageNumber) {
                          setCurrentPage(pageNumber);
                        }
                      }}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage((previous) => previous + 1)}
                  disabled={currentPage === pagesAmount}
                >
                  Avançar
                </button>
              </li>
            </ul>
          </nav>
        </Container>
      )}
      {showComponent && (
        <div>
          <button type="button" onClick={() => setShowComponent(false)}>
            Voltar
          </button>
          <LaunchComponent launch={launch} />
        </div>
      )}
    </>
  );
};

export default ManyLaunchs;
