import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import CreateGraduate from './pages/CreateGraduate';
import UpdateGraduate from './pages/UpdateGraduate';
import ViewAllGraduates from './pages/ViewAllGraduates';
import ViewGraduate from './pages/ViewGraduate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='create' element={<CreateGraduate />} />
        <Route path='update/:id' element={<UpdateGraduate />} />
        <Route path='viewall' element={<ViewAllGraduates />} />
        <Route path='customer/:id' element={<ViewGraduate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
