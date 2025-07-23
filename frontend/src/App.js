import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListarFilmes from './pages/ListarFilmes';
import CadastrarFilme from './pages/CadastrarFilme';
import EditarFilme from './pages/EditarFilme';
import DetalhesFilme from './pages/DetalhesFilme';
import Header from './components/Header';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListarFilmes />} />
        <Route path="/cadastro" element={<CadastrarFilme />} />
        <Route path="/editar/:id" element={<EditarFilme />} />
        <Route path="/filme/:id" element={<DetalhesFilme />} />
      </Routes>
    </Router>
  );
}

