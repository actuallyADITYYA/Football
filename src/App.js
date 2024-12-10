import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddData from './AddData';
import UpdateData from './UpdateData';
import DeleteData from './DeleteData';
import DisplayData from './DisplayData';
import SummaryData from './SummaryData';
import WinsData from './WinsData';
import AverageGoalsData from './AverageGoalsData';
import NavBar from './NavBar';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<h1>Football Data Management</h1>} />
      <Route path="/add" element={<AddData />} />
      <Route path="/update" element={<UpdateData />} />
      <Route path="/delete" element={<DeleteData />} />
      <Route path="/display" element={<DisplayData />} />
      <Route path="/summary" element={<SummaryData />} />
      <Route path="/wins" element={<WinsData />} />
      <Route path="/average-goals" element={<AverageGoalsData />} />
    </Routes>
  </Router>
);

export default App;
