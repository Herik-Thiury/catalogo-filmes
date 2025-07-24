import { Link, useLocation } from "react-router-dom"
import "../styles/global.css"

function Navbar() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">CineHub</span>
        </Link>

        {/* Menu de navegação */}
        <div className="navbar-menu">
          <Link to="/" className={`navbar-link ${isActive("/") ? "active" : ""}`}>
            Catálogo
          </Link>
          <Link to="/cadastro" className={`navbar-link ${isActive("/cadastro") ? "active" : ""}`}>
            Adicionar Filme
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
