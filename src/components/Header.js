import styled from "styled-components";
import logout from "../assets/images/Vector.png";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Header({ text, signOutButton }) {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  function signOut() {
    const body = {
      id: userId,
    };
    const promise = axios.post(
      `https://projeto13-mywallet-back-production-9bcc.up.railway.app/sign-out`,
      body
    );
    promise.then((res) => {
      navigate("/", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.data);
      navigate("/", { replace: true });
    });
  }
  return (
    <StyledDiv signOutButton={signOutButton}>
      <div>{text}</div>
      <img onClick={signOut} src={logout} alt="Figura de logout" />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #8c11be;
  font-weight: 700;
  font-size: 26px;
  padding: 0 25px;
  color: #ffffff;

  div {
    padding-top: 30px;
  }

  img {
    visibility: ${(props) => (props.signOutButton ? "initial" : "hidden")};
    width: 23px;
    height: 24px;
    margin: 0;
  }
`;

export default Header;
