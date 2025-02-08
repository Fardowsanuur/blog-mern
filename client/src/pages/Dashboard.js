import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate(); // For updating the URL when changing tabs
  const [tab, setTab] = useState('');

  // Sync tab with the URL search parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      // Default to dashboard tab if no tab in URL
      setTab('dash');
    }
  }, [location.search]);

  // Update the URL when the tab is changed
  const changeTab = (newTab) => {
    setTab(newTab);
    navigate(`?tab=${newTab}`, { replace: true }); // Update URL without reloading
  };

  // Render content based on the selected tab
  const renderContent = () => {
    switch (tab) {
      case 'posts':
        return <DashPosts />;
      case 'users':
        return <DashUsers />;
      case 'dash':
        return <DashboardComp />;
      default:
        return <DashboardComp />; // Default to dashboard if invalid tab
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar activeTab={tab} onTabChange={changeTab} />
      </div>
      {/* Render dynamic content based on tab */}
      <div className='flex-1'>
        {renderContent()}
      </div>
    </div>
  );
}
