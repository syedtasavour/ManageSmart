import React, { useState } from 'react';
import { 
  Menu, 
  Icon, 
  Button, 
  Dropdown, 
  Image,
  Input,
  Segment
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import type { NavigationProps } from '../../types/ui.interface';

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const menuItems = [
    { name: 'dashboard', icon: 'dashboard' as const, text: 'Dashboard', path: '/dashboard' },
    { name: 'projects', icon: 'folder' as const, text: 'Projects', path: '/projects' },
    { name: 'tasks', icon: 'tasks' as const, text: 'Tasks', path: '/tasks' },
    { name: 'team', icon: 'users' as const, text: 'Team', path: '/team' },
    { name: 'reports', icon: 'chart bar' as const, text: 'Reports', path: '/reports' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Segment className="!m-0 !rounded-none !border-b !border-gray-200 !bg-white !shadow-sm">
      <Menu secondary className="!m-0 !border-none !bg-transparent">
        {/* Logo */}
        <Menu.Item className="!p-0">
          <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
            <Icon name="dashboard" />
            ManageSmart
          </Link>
        </Menu.Item>

        {/* Navigation Links */}
        <Menu.Menu position="left" className="!ml-8">
          {menuItems.map((item) => (
            <Menu.Item
              key={item.name}
              as={Link}
              to={item.path}
              active={location.pathname === item.path}
              className="!text-gray-700 hover:!bg-gray-100 !rounded-md"
            >
              <Icon name={item.icon} />
              {item.text}
            </Menu.Item>
          ))}
        </Menu.Menu>

        {/* Search Bar */}
        <Menu.Menu position="right" className="!mr-4">
          <Menu.Item className="!p-0">
            <form onSubmit={handleSearch} className="flex">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon="search"
                className="!w-64"
                size="small"
              />
            </form>
          </Menu.Item>
        </Menu.Menu>

        {/* User Menu */}
        <Menu.Menu position="right">
          <Menu.Item className="!p-0">
            <Dropdown
              trigger={
                <Button basic className="!flex !items-center !gap-2 !text-gray-700">
                  <Image
                    avatar
                    src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" 
                    alt="Default Avatar" 
                    width={32} 
                    height={32}
                    className="!w-8 !h-8"
                  />
                  <span className="hidden sm:inline font-medium">
                    {user?.name || 'User'}
                  </span>
                  <Icon name="chevron down" size="small" />
                </Button>
              }
              options={[
                { key: 'profile', text: 'Profile', icon: 'user' as const },
                { key: 'settings', text: 'Settings', icon: 'settings' as const },
                { key: 'help', text: 'Help', icon: 'help circle' as const },
                { key: 'logout', text: 'Logout', icon: 'sign-out' as const, onClick: onLogout },
              ]}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Navigation; 