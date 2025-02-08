

import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie } from 'react-icons/hi';
import { UserContext } from '../UserContext';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/logout', {
        credentials: 'include',
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserInfo(null); // Clear user info from context
        navigate('/'); // Redirect to the home page
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!userInfo || !userInfo.id) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="sidebar"
      style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#0C0421',
        padding: '10px',
        position: 'fixed',
        border: '4px solid #003566',
        borderRadius: '3px',
        top: 0,
        left: 0,
        color: '#FFFFFF',
        overflowY: 'auto',
      }}
    >
      <div className="sidebar-items">
        <div className="sidebar-item-group" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=dash" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className={`sidebar-item ${tab === 'dash' || !tab ? 'active' : ''}`}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <HiChartPie style={{ marginRight: '10px' }} />
                <span>Dashboard</span>
              </div>
            </Link>
          )}
          {/* <Link to="/dashboard?tab=profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              className={`sidebar-item ${tab === 'profile' ? 'active' : ''}`}
              style={{
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <HiUser style={{ marginRight: '10px' }} />
              <span>Profile</span>
            </div>
          </Link> */}
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=posts" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className={`sidebar-item ${tab === 'posts' ? 'active' : ''}`}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <HiDocumentText style={{ marginRight: '10px' }} />
                <span>Posts</span>
              </div>
            </Link>
          )}
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=users" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className={`sidebar-item ${tab === 'users' ? 'active' : ''}`}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <HiOutlineUserGroup style={{ marginRight: '10px' }} />
                <span>Users</span>
              </div>
            </Link>
          )}
          <div
            className="sidebar-item"
            onClick={handleSignout}
            style={{
              padding: '10px',
              cursor: 'pointer',
              color: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <HiArrowSmRight style={{ marginRight: '10px' }} />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
