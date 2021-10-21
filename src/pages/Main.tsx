import React, { useState } from "react";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";

const MainPage: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleActiveIndexUpdate = (activeIndex: number) => {
    setIndex(activeIndex);
  };
  return (
    <div>
      <TabBar
        activeIndex={index}
        handleActiveIndexUpdate={handleActiveIndexUpdate}
      >
        <Tab>
          <span className="mdc-tab__text-label">Último lançamento</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Últimos lançamentos</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Próximos lançamentos</span>
        </Tab>
        <Tab>
          <span className="mdc-tab__text-label">Próximo lançamento</span>
        </Tab>
      </TabBar>
    </div>
  );
};

export default MainPage;
