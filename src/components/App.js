import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import RecordsScreen from "./RecordsScreen";
import NewRecordScreen from "./NewRecordScreen";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [recordType, setRecordType] = useState("");

  function updateToken() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: userId,
      },
    };

    const promise = axios.put("http://localhost:5000/status", {}, config);
    promise.catch((err) => {
      console.log(err.response.data);
    });
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          email,
          setEmail,
          password,
          setPassword,
          name,
          setName,
          token,
          setToken,
          userId,
          setUserId,
          recordType,
          setRecordType,
          updateToken,
        }}
      >
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route path="/records" element={<RecordsScreen />} />
          <Route path="/create-record" element={<NewRecordScreen />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
