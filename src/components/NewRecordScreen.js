import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import StyledButton from "../styledComponents/StyledButton";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledContent from "../styledComponents/StyledContent";
import Header from "./Header";

function NewRecordScreen() {
  const { userId, token, recordType, updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  function inputRecord(type, e) {
    e.preventDefault();
    updateToken();
    const body = {
      description,
      amount,
      type,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: userId,
      },
    };

    const promise = axios.post(
      `https://projeto13-mywallet-back-production-9bcc.up.railway.app/records`,
      body,
      config
    );
    promise.then((res) => {
      navigate("/records", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return recordType === "income" ? (
    <StyledContainer>
      <StyledContent>
        <Header text="Nova entrada" signOutButton={false} />
        <form onSubmit={(e) => inputRecord(recordType, e)}>
          <input
            disabled={disable}
            id="amount"
            type="number"
            placeholder="Valor"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
          <input
            disabled={disable}
            id="description"
            type="text"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <StyledButton
            disabled={disable}
            height={46}
            width={326}
            fontSize={20}
          >
            Salvar entrada
          </StyledButton>
        </form>
      </StyledContent>
      <CompletePageDiv></CompletePageDiv>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <StyledContent>
        <Header text="Nova saída" signOutButton={false} />
        <form onSubmit={(e) => inputRecord(recordType, e)}>
          <input
            disabled={disable}
            id="amount"
            type="number"
            placeholder="Valor"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
          <input
            disabled={disable}
            id="description"
            type="text"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <StyledButton
            disabled={disable}
            height={46}
            width={326}
            fontSize={20}
          >
            Salvar saída
          </StyledButton>
        </form>
      </StyledContent>
      <CompletePageDiv></CompletePageDiv>
    </StyledContainer>
  );
}

export default NewRecordScreen;

const CompletePageDiv = styled.div`
  height: 300px;
  width: 100%;
`;
