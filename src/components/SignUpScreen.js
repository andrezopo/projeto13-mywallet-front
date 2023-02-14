import StyledButton from "../styledComponents/StyledButton";
import myWallet from "../assets/images/MyWallet.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledContainer from "../styledComponents/StyledContainer";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function SignUpScreen() {
  const [disable, setDisable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email, setEmail, password, setPassword, name, setName } =
    useContext(UserContext);
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_BASE_URL);

    const body = {
      email,
      password,
      name,
      confirmPassword,
    };
    const promise = axios.post(
      `https://projeto13-mywallet-back-production-9bcc.up.railway.app/sign-up`,
      body
    );
    setDisable(true);
    promise.then(() => {
      setDisable(false);
      navigate("/", { replace: true });
    });
    promise.catch((err) => {
      alert(err.response.data);
      setDisable(false);
    });
  }

  return (
    <StyledContainer disabled={disable}>
      <img src={myWallet} alt="my-wallet logo" />
      <form onSubmit={register}>
        <input
          disabled={disable}
          id="name"
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          disabled={disable}
          id="email"
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          disabled={disable}
          id="password"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <input
          disabled={disable}
          id="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        <StyledButton disabled={disable} height={46} width={326} fontSize={20}>
          Cadastrar
        </StyledButton>
      </form>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </StyledContainer>
  );
}

export default SignUpScreen;
