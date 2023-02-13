import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import StyledButton from "../styledComponents/StyledButton";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledContent from "../styledComponents/StyledContent";
import Header from "./Header";

function RecordsScreen() {
  const { name, userId, token, setRecordType, updateToken, setRecord } =
    useContext(UserContext);
  const [records, setRecords] = useState([]);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    updateToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: userId,
      },
    };

    const promise = axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/records`,
      config
    );
    promise.then((res) => {
      setRecords([...res.data.records]);
      setRecordsTotal(res.data.recordsSum);
    });
    promise.catch((err) => {
      alert(err.response.data);
      navigate("/", { replace: true });
    });
  }, []);

  function newRecord(type) {
    setRecordType(type);
    navigate("/create-record", { replace: true });
  }

  function deleteRecord(recordId) {
    const resultado = window.confirm(
      "Tem certeza que deseja excluir esse registro?"
    );
    if (!resultado) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: userId,
        recordId,
      },
    };
    const promise = axios.delete(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/records`,
      config
    );
    promise.then((res) => {
      navigate("/create-record", { replace: true });
      navigate("/records", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.data);
      navigate("/", { replace: true });
    });
  }

  function getRecord(record) {
    setRecord(record);
    navigate("/update", { replace: true });
  }

  function renderRecords() {
    if (records.length > 0) {
      const renderedRecords = records.map((record, index) => {
        return (
          <RecordDiv key={index} type={record.type}>
            <div>
              <p>{record.date}</p>{" "}
              <h4 onClick={() => getRecord(record)}>{record.description}</h4>
            </div>
            <div>
              {parseFloat(record.amount).toFixed(2).replace(".", ",")}
              <p onClick={() => deleteRecord(record._id)}>x</p>
            </div>
          </RecordDiv>
        );
      });

      return renderedRecords;
    } else {
      return <NoRecordsDiv>Não há registros de entrada ou saída</NoRecordsDiv>;
    }
  }

  const renderedRecords = renderRecords();

  return (
    <StyledContainer>
      <Header text={`Olá, ${name}`} signOutButton={true} />
      <StyledContent>
        <RecordsDiv>
          <div>{renderedRecords}</div>
          {renderedRecords.length > 0 ? (
            <BalanceDiv balance={recordsTotal}>
              <div>SALDO</div>
              <div>{parseFloat(recordsTotal).toFixed(2).replace(".", ",")}</div>
            </BalanceDiv>
          ) : null}
        </RecordsDiv>
        <Footer>
          <div onClick={() => newRecord("income")}>
            <div>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div>Nova entrada</div>
          </div>
          <div onClick={() => newRecord("outcome")}>
            <div>
              <ion-icon name="remove-circle-outline"></ion-icon>
            </div>
            <div>Nova saída</div>
          </div>
        </Footer>
      </StyledContent>
    </StyledContainer>
  );
}

export default RecordsScreen;

const RecordsDiv = styled.div`
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #8c11be;
  border-radius: 5px;
  padding: 0 12px 10px 12px;
  & > div > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const RecordDiv = styled.div`
  width: 100%;
  height: 20px;
  font-size: 16px;
  margin: 23px auto;
  div {
    display: flex;
    align-items: center;
  }
  & div:last-child {
    color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
  }
  p {
    color: #c6c6c6;
    display: inline-block;
  }
  p:first-child {
    margin-right: 12px;
  }
  p:last-child {
    margin-left: 12px;
  }
  h4 {
    color: #000000;
  }
`;

const NoRecordsDiv = styled.div`
  margin: 60% auto;
  width: 180px;
  height: 46px;
  color: #868686;
  word-break: break-all;
  text-align: center;
`;

const BalanceDiv = styled.div`
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div:last-child {
    font-weight: 400;
    color: ${(props) => (props.balance >= 0 ? "#03AC00" : "#C70000")};
  }
`;

const Footer = styled.div`
  height: 145px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  & > div {
    border-radius: 5px;
    background-color: #a328d6;
    height: 90%;
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    color: #ffffff;
    padding: 10px;
    div {
      display: flex;
      justify-content: flex-start;
      height: 50%;
      width: 40px;
    }
    div:last-child {
      font-size: 17px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
  }
`;
