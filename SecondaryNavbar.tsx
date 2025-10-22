"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, BookOpen, Brain, Puzzle, Users, Bell, Palette, Sparkles, Settings2, User as UserIcon, Lightbulb, LogIn, Clock, Award } from 'lucide-react'; // Added Clock and Award icons
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/context/SettingsContext';
import { Badge } from '@/components/ui/badge';

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
            "relative flex flex-col items-center justify-center h-16 w-16 rounded-lg p-1 text-xs transition-colors",
            isActive ? activeClasses : "text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Link to={to} className="flex flex-col items-center justify-center w-full h-full">
            <Icon className="h-5 w-5 mb-1" />
            {badgeCount !== undefined && badgeCount > 0 && (
              <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 rounded-full text-xs">
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

const SecondaryNavbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { settings } = useSettings();
  const currentPath = location.pathname;

  const homeExtensions = [
    { to: '/calendario', icon: CalendarDays, label: t('navbar.smart_calendar'), key: 'calendar' },
    { to: '/diario', icon: BookOpen, label: t('navbar.emotional_diary'), key: 'diary' },
    { to: '/ai-insights', icon: Brain, label: t('dashboard_page.ai_insights_title'), key: 'ai-insights' },
  ];

  const profileExtensions = [
    { to: '/profile', icon: UserIcon, label: t('navbar.profilo'), key: 'profile' },
    { to: '/profile/i-miei-badge', icon: Award, label: t('profile_page.badges_title'), key: 'my-badges' },
    { to: '/profile/attivita-recenti', icon: Clock, label: t('profile_page.activity_log_title'), key: 'activity-log' },
  ];

  // Level 2: Main Settings Categories
  const mainSettingsCategories = [
    { to: '/impostazioni/aspetto-design', icon: Palette, label: t('settings_page.appearance_design_title'), key: 'appearance-design' },
    { to: '/impostazioni/esperienza-utente-interazione', icon: Sparkles, label: t('settings_page.user_experience_interaction_title'), key: 'ux-interaction' },
    { to: '/impostazioni/sistema-dati', icon: Settings2, label: t('settings_page.system_data_title'), key: 'system-data' },
    { to: '/impostazioni/idee', icon: Lightbulb, label: t('settings_page.user_ideas_title'), key: 'user-ideas' },
    { to: '/notifiche', icon: Bell, label: t('navbar.notifications'), badgeCount: settings.unreadNotificationCount, key: 'notifications' },
    // Removed Suggestions from here
  ];

  let displayedItems: NavItemProps[] = [];
  
  if (currentPath === '/' || currentPath.startsWith('/calendario') || currentPath.startsWith('/diario') || currentPath.startsWith('/ai-insights')) {
    displayedItems = homeExtensions;
  } else if (currentPath.startsWith('/profile')) { // This now covers /profile and its sub-paths
    displayedItems = profileExtensions;
  } else if (currentPath.startsWith('/impostazioni') || currentPath.startsWith('/notifiche')) { // Removed /suggerimenti
    displayedItems = mainSettingsCategories;
  }

  // SecondaryNavbar is visible if the path starts with /impostazioni or /notifiche,
  // and not if the HealthNavbar is active.
  const isVisible =
    !currentPath.startsWith('/salute-mentale') &&
    currentPath !== '/login' && // Hide on login page
    (currentPath === '/' ||
     currentPath.startsWith('/calendario') ||
     currentPath.startsWith('/diario') ||
     currentPath.startsWith('/ai-insights') ||
     currentPath.startsWith('/profile') || // Now includes profile sub-paths
     currentPath.startsWith('/impostazioni') ||
     currentPath.startsWith('/notifiche')); // Removed /suggerimenti

  const bgColor = `hsla(var(--background-h), var(--background-s), var(--background-l), ${settings.navbarOpacity / 100})`;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40 shadow-sm p-2 flex justify-center items-center transition-all duration-300 overflow-hidden",
        "top-[var(--total-height-primary-nav)]",
        isVisible ? "h-[var(--secondary-navbar-height)] opacity-100" : "h-0 opacity-0 pointer-events-none"
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex space-x-2">
        {displayedItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.to} // Use exact match for secondary nav items
            badgeCount={item.badgeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavbar;