import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Questions from "./pages/Questions";
import Login from "./pages/Login";
import NewPoll from "./pages/NewPoll";
import RequiredAuth from "./pages/RequiredAuth";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Question from "./pages/Question";

function App() {

  return (

    <Routes>
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/:question_id" element={<Question />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />




    </Routes>

  );
}

export default App;
