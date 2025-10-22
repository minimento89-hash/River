"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, User, Settings as SettingsIcon, CircleDot, CircleCheck, CircleMinus, CircleOff, Sparkles as SparklesIcon, Layers, HeartPulse, LogOut, LayoutGrid } from 'lucide-react'; // Rimosso Clock e Award
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/context/SettingsContext';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import AppLogo from './AppLogo';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive, badgeCount }) => {
  const { settings } = useSettings();
  const activeClasses = settings.customAccentColor
    ? "bg-[var(--custom-accent)] text-white"
    : "bg-primary text-primary-foreground";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          className={cn(
            "relative flex flex-col items-center justify-center h-20 w-20 rounded-lg p-2 text-sm transition-colors",
            isActive ? activeClasses : "text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Link to={to} className="flex flex-col items-center justify-center w-full h-full">
            <Icon className="h-6 w-6 mb-1" />
            {badgeCount !== undefined && badgeCount > 0 && (
              <Badge className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                {badgeCount}
              </Badge>
            )}
            <span>{label}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { settings, updateSetting, logout } = useSettings();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    const baseClasses = "h-6 w-6 mr-2 drop-shadow-lg";
    switch (status) {
      case 'online': return <CircleCheck className={cn(baseClasses, "text-green-500")} />;
      case 'busy': return <CircleDot className={cn(baseClasses, "text-red-500")} />;
      case 'away': return <CircleMinus className={cn(baseClasses, "text-yellow-500")} />;
      case 'invisible': return <CircleOff className={cn(baseClasses, "text-gray-500")} />;
      case 'in_ai_session': return <SparklesIcon className={cn(baseClasses, "text-purple-500")} />;
      case 'creation_in_progress': return <Layers className={cn(baseClasses, "text-blue-500")} />;
      default: return <CircleCheck className={cn(baseClasses, "text-green-500")} />;
    }
  };

  const handleStatusChange = (newStatus: 'online' | 'busy' | 'away' | 'invisible' | 'in_ai_session' | 'creation_in_progress') => {
    updateSetting('userProfile', { ...settings.userProfile, status: newStatus });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info(t('dyad_suggests_login_page.logged_out_success'));
  };

  const mainNavItems = [
    { to: '/', icon: HomeIcon, label: t('navbar.home'), key: 'home', subPaths: ['/calendario', '/diario', '/ai-insights'] },
    { to: '/profile', icon: User, label: t('navbar.profilo'), key: 'profile', subPaths: ['/profile', '/profile/attivita-recenti', '/profile/i-miei-badge'] }, // Profile now has sub-paths
    { to: '/salute-mentale', icon: HeartPulse, label: t('navbar.mental_health'), key: 'mental-health', subPaths: ['/salute-mentale', '/salute-mentale/dashboard-progressi', '/salute-mentale/strumenti'] },
    { to: '/impostazioni', icon: SettingsIcon, label: t('navbar.impostazioni'), key: 'settings', subPaths: ['/notifiche', '/impostazioni/colori-rapidi', '/impostazioni/colori-gradient', '/impostazioni/animazioni', '/impostazioni/trasparenza', '/impostazioni/lingua', '/impostazioni/illuminazione', '/impostazioni/avanzate', '/impostazioni/font', '/impostazioni/sfondo', '/impostazioni/accessibilita', '/impostazioni/idee'] },
  ];

  const currentPath = location.pathname;

  const isMainNavItemActive = (itemTo: string, itemSubPaths: string[]) => {
    if (currentPath === itemTo) return true;
    return itemSubPaths.some(subPath => currentPath.startsWith(subPath));
  };

  const bgColor = `hsla(var(--background-h), var(--background-s), var(--background-l), ${settings.navbarOpacity / 100})`;

  if (currentPath === '/login') {
    return null;
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 shadow-md p-2 flex items-center justify-between transition-all duration-300",
      "backdrop-blur-sm"
    )}
    style={{ backgroundColor: bgColor, height: 'var(--navbar-height)' }}
    >
      {/* Left Section: User Avatar and Info */}
      <div className="flex-1 flex justify-start items-center ml-4 z-10">
        {settings.isLoggedIn && (
          <>
            <Link to="/profile" className="mr-4">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src={settings.userProfile.avatarUrl} alt={settings.userProfile.name} />
                <AvatarFallback>{settings.userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex flex-col items-start justify-center ml-2">
              <span className="text-lg font-semibold text-foreground">
                {settings.userProfile.name || settings.userProfile.nickname || t('profile_page.dear_user')}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-foreground p-0 h-auto">
                    {getStatusIcon(settings.userProfile.status)}
                    <span className="hidden md:inline text-sm">{t(`profile_page.status_${settings.userProfile.status}`)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusChange('online')}>
                    <CircleCheck className="h-4 w-4 mr-2 text-green-500" /> {t('profile_page.status_online')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('busy')}>
                    <CircleDot className="h-4 w-4 mr-2 text-red-500" /> {t('profile_page.status_busy')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('away')}>
                    <CircleMinus className="h-4 w-4 mr-2 text-yellow-500" /> {t('profile_page.status_away')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('invisible')}>
                    <CircleOff className="h-4 w-4 mr-2 text-gray-500" /> {t('profile_page.status_invisible')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('in_ai_session')}>
                    <SparklesIcon className="h-4 w-4 mr-2 text-purple-500" /> {t('profile_page.status_in_ai_session')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('creation_in_progress')}>
                    <Layers className="h-4 w-4 mr-2 text-blue-500" /> {t('profile_page.status_creation_in_progress')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2 text-red-500" /> {t('dyad_suggests_login_page.logout_button')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Center Section: Main Nav Items */}
      <div className="flex-1 flex justify-center items-center space-x-4 z-10">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={isMainNavItemActive(item.to, item.subPaths)}
          />
        ))}
      </div>

      {/* Right Section: App Logo and Suggestions */}
      <div className="flex-1 flex flex-col items-end justify-center mr-4 z-10">
        <AppLogo className="mb-1" iconClassName="h-5 w-5" textClassName="text-lg" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" asChild className="h-auto p-1 text-xs">
                <Link to="/suggerimenti" className="flex flex-col items-center">
                  <LayoutGrid className="h-4 w-4" />
                  <span>{t('navbar.suggestions')}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{t('navbar.suggestions')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;