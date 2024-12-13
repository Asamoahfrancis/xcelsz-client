import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scheduler from "./pages/Scheduler/Scheduler";
import NewScheduler from "./pages/NewScheduler/NewScheduler";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Scheduler />} />
        <Route path="/" element={<NewScheduler />} />
      </Routes>
    </Router>
  );
};

export default App;
