import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '1rem', background: '#eee' }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Listar</Link>
        <Link to="/cadastro">Cadastrar</Link>
      </nav>
    </header>
  );
}
