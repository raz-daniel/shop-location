import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className='Home'>
      <div className='Home-banner'>
        <h1>Store Location Mapping</h1>
        <p>Discover and manage retail locations with our easy-to-use platform. Add new stores, browse by category, and keep track of all your locations in one place.</p>
      </div>

      <div className='Home-features'>
        <div className='Home-feature'>
          <div className='Home-feature-icon'>📍</div>
          <h3>Store Finder</h3>
          <p>Browse our comprehensive database of store locations organized by category.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>➕</div>
          <h3>Add Locations</h3>
          <p>Easily add new store locations with our simple submission form.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>🗃️</div>
          <h3>Category Management</h3>
          <p>Filter stores by category to quickly find what you're looking for.</p>
        </div>
      </div>

      <div className='Home-cta'>
        <Link to="/stores/list">Browse Stores</Link>
      </div>
    </div>
  );
}