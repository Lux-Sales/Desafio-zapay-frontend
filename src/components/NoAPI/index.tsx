import React from "react";
import { Container } from "./styles";

export const NoAPIComponent = () => {
  return (
    <Container>
      <h1>Conexão com a spacex falhou!</h1>
      <span>Aguarde e tente novamente mais tarde</span>
    </Container>
  );
};

export default NoAPIComponent;
