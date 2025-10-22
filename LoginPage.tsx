"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Lock, Eye, EyeOff, Languages as LanguagesIcon, User as UserIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSettings } from '@/context/SettingsContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, settings, updateSetting } = useSettings();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      login();
      toast.success(t('dyad_suggests_login_page.welcome_back'));
      navigate('/');
    } else {
      toast.error("Per favore, inserisci un nome utente e una password.");
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    updateSetting('language', lng);
    toast.success(t('dyad_suggests_login_page.language_changed_success', { language: languages.find(lang => lang.code === lng)?.name || lng }));
  };

  const languages = [
    { code: 'it', name: t('language_settings_page.italian') },
    { code: 'en', name: t('language_settings_page.english') },
    { code: 'fr', name: t('language_settings_page.french') },
    { code: 'de', name: t('language_settings_page.german') },
    { code: 'es', name: t('language_settings_page.spanish') },
    { code: 'pt', name: t('language_settings_page.portuguese') },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Login Card */}
      <Card className={cn("w-full max-w-sm mx-auto bg-background/50 backdrop-blur-lg border shadow-lg relative z-10 text-foreground")}>
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            {t('dyad_suggests_login_page.login_button')}
          </h1>
          <p className="text-muted-foreground text-xl font-semibold">
            {t('dyad_suggests_login_page.in_text')}
          </p>
          <h2
            className="text-4xl font-bold"
            style={{
              background: 'linear-gradient(to right, #e04040, #00c0c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent', // Fallback for non-webkit browsers
            }}
          >
            MiMente
          </h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">{t('dyad_suggests_login_page.username_placeholder')}</Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder={t('dyad_suggests_login_page.username_placeholder')}
                  className="pl-10 bg-background/50 text-foreground border-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('dyad_suggests_login_page.password_placeholder')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('dyad_suggests_login_page.password_placeholder')}
                  className="pl-10 pr-10 bg-background/50 text-foreground border-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" className="border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                <label htmlFor="remember-me" className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('dyad_suggests_login_page.remember_me')}
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t('dyad_suggests_login_page.login_button')}
            </Button>
          </form>

          {/* Language Selector */}
          <div className="mt-4 space-y-2">
            <Label htmlFor="language-select" className="sr-only">{t('language_settings_page.title')}</Label>
            <Select value={settings.language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language-select" className="w-full bg-background/50 text-foreground border-input">
                <LanguagesIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder={t('language_settings_page.title')} />
              </SelectTrigger>
              <SelectContent className="bg-background/80 backdrop-blur-sm">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;