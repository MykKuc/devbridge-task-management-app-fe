import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header
      style={{ height: 'var(--navbar-height)' }}
      className="navbar fixed-top bg-dark d-flex justify-content-around"
    >
      <Link className="nav-link text-white" to="/">
        home
      </Link>
      <Link className="nav-link text-white" to="/tasks">
        tasks
      </Link>
    </header>
  );
}

export default Header;
