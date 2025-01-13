import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Nav } from 'react-bootstrap';

export default function NavigationList() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/messages', label: 'Messages' },
    { href: '/bookmarks', label: 'Bookmarks' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <Nav className="flex-column">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Nav.Item key={href}>
            <Link 
              href={href} 
              className={`nav-link py-2 px-3 rounded ${isActive ? 'text-white bg-primary' : 'text-secondary hover:text-white'}`}    
            > 
              <span className="fs-5">{label}</span> 
            </Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
} 