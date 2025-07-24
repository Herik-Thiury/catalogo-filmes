
import { Link } from 'react-router-dom';
import '../styles/global.css'; // Mantenha a importação do CSS global

export default function Header() {
  return (
    <header className="main-header"> {/* Adicionamos a classe 'main-header' */}
      <nav className="main-nav"> {/* Adicionamos a classe 'main-nav' */}
        <Link to="/" className="nav-link"></Link> {/* Adicionamos a classe 'nav-link' */}
        <Link to="/cadastro" className="nav-link"></Link> {/* Adicionamos a classe 'nav-link' */}
      </nav>
    </header>
  );
}