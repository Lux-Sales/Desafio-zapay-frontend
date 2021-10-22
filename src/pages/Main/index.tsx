/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import { Tab, TabBar } from "@rmwc/tabs";
import { Container } from "./styles";
import LaunchComponent from "../../components/Launch";
import { Launch, getLastLaunch, getNextLaunch } from "../../service/api";

const MainPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [launch, setLaunch] = useState<Launch | undefined>(undefined);
  const handleChange = async (option: number) => {
    switch (option) {
      case 0:
        setIndex(0);
        const latestLaunch = await getLastLaunch();
        setLaunch(latestLaunch);
        break;
      case 1:
        setIndex(1);
        break;
      case 2:
        setIndex(2);
        break;
      case 3:
        setIndex(3);
        const nextLaunch = await getNextLaunch();
        setLaunch(nextLaunch);
        break;
      default:
        setIndex(-1);
    }
  };
  return (
    <Container>
      <h1>Spacex Lançamentos</h1>
      <TabBar
        activeTabIndex={index}
        onActivate={(e) => handleChange(e.detail.index)}
      >
        <Tab>
          <span className="mdc-tab__text-label">Último lançamento</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Lançamentos passados</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Lançamentos futuros</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Próximo lançamento</span>
        </Tab>
      </TabBar>
      {(index === 0 || index === 3) && <LaunchComponent launch={launch} />}
    </Container>
  );
};

export default MainPage;
