import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import NewQuestion from "./pages/NewQuestion";
import RequiredAuth from "./pages/RequiredAuth";

function App() {

  return (

    <Routes>
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/new-question" element={<NewQuestion />}></Route>
          <Route path="/leaderboard" element={<LeaderBoard />}></Route>
          <Route index element={<Home />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />

    </Routes>

  );
}

export default App;
