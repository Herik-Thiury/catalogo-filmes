
import { Link } from 'react-router-dom';
import '../styles/global.css'; 

export default function Header() {
  return (
    <header className="main-header"> 
      <nav className="main-nav"> 
        <Link to="/" className="nav-link"></Link> 
        <Link to="/cadastro" className="nav-link"></Link> 
      </nav>
    </header>
  );
}