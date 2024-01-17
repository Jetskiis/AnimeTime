import "./App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import CardView from "./components/CardView";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterPage";
import LoginForm from "./components/LoginPage";
import ResetLogin from "./components/ResetLogin";
import { seasonInfo } from "./modules/Season";


const App = () => {
  const firstSeason = seasonInfo.firstSeason;
  const secondSeason = seasonInfo.secondSeason;
  const thirdSeason = seasonInfo.thirdSeason;
  const fourthSeason = seasonInfo.fourthSeason;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={`/${firstSeason.year}/${firstSeason.season}`} />
            }
          />

          <Route
            path={`/${firstSeason.year}/${firstSeason.season}`}
            element={
              <CardView season={firstSeason.season} year={firstSeason.year} />
            }
          />
          <Route
            path={`/${secondSeason.year}/${secondSeason.season}`}
            element={
              <CardView season={secondSeason.season} year={secondSeason.year} />
            }
          />
          <Route
            path={`/${thirdSeason.year}/${thirdSeason.season}`}
            element={
              <CardView season={thirdSeason.season} year={thirdSeason.year} />
            }
          />
          
          <Route
            path={`/${fourthSeason.year}/${fourthSeason.season}`}
            element={
              <CardView season={fourthSeason.season} year={fourthSeason.year} />
            }
          />

          <Route
            path={'/login'}
            element={<LoginForm />}
          />

          <Route 
          path={'/register'}
          element={<RegisterForm />}
          />
          <Route path={'/reset-password'} element={<ResetLogin/>}/>

        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
