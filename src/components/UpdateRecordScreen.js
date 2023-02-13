import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import StyledButton from "../styledComponents/StyledButton";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledContent from "../styledComponents/StyledContent";
import Header from "./Header";

function UpdateRecordScreen() {
  const { userId, token, recordType, updateToken, record, setRecordType } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setAmount(record.amount);
    setDescription(record.description);
    setRecordType(record.type);
  }, []);

  function inputRecord(e) {
    e.preventDefault();
    updateToken();
    const body = {
      description,
      amount,
      type: record.type,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: userId,
        recordId: record._id,
      },
    };

    const promise = axios.put(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/records`,
      body,
      config
    );
    promise.then((res) => {
      navigate("/records", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.data);
      if (err.response.data === "Registro não encontrado!") {
        navigate("/records", { replace: true });
      }
    });
  }

  return recordType === "income" ? (
    <StyledContainer>
      <StyledContent>
        <Header text="Editar entrada" signOutButton={false} />
        <form onSubmit={(e) => inputRecord(e)}>
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
            Atualizar entrada
          </StyledButton>
        </form>
      </StyledContent>
      <CompletePageDiv></CompletePageDiv>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <StyledContent>
        <Header text="Editar saída" signOutButton={false} />
        <form onSubmit={(e) => inputRecord(e)}>
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
            Atualizar saída
          </StyledButton>
        </form>
      </StyledContent>
      <CompletePageDiv></CompletePageDiv>
    </StyledContainer>
  );
}

export default UpdateRecordScreen;

const CompletePageDiv = styled.div`
  height: 300px;
  width: 100%;
`;
