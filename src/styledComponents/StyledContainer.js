import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #8c11be;
  font-size: 20px;
  padding-top: ${(props) => (props.signIn ? "65px" : "0")};

  img {
    width: 150px;
    height: 50px;
    margin: 95px auto 26px auto;
  }

  input {
    width: 326px;
    height: 60px;
    margin-bottom: 13px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    ::placeholder {
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      color: #000000;
    }
  }

  a {
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    margin-top: 30px;
    color: #ffffff;
    margin-bottom: 100px;

    &:visited {
      color: #ffffff;
      text-decoration: none;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  }
`;

export default StyledContainer;
