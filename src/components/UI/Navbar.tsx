import { useAuth } from '@/context';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const { signedIn, handleSignOut } = useAuth() 
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Travel journal
          <span role='img' aria-labelledby='airplane'>
            🛫
          </span>
          <span role='img' aria-labelledby='heart'>
            ❤️
          </span>
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          {signedIn && (
            <li>
            <NavLink to='/create'>Create post</NavLink>
          </li>
          )}

          {!signedIn ? (
          <>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          </>
          ) : (
            <li>
            <button onClick={handleSignOut}>Logout</button>
          </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
