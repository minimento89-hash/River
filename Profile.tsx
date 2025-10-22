"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { User, Mail, PenLine, Clock, CircleDot, CircleCheck, CircleMinus, CircleOff, Sparkles, Layers, Lock, Award } from 'lucide-react';
import { toast } from 'sonner';
import DynamicCard from '@/components/DynamicCard';
import { useSettings } from '@/context/SettingsContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { allBadgesData, BadgeDefinition } from '@/data/badgesData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AvatarItem {
  name: string;
  path: string;
}

export const predefinedAvatars: AvatarItem[] = [
  // Symbols
  { name: 'Star', path: '/avatars/star.svg' },
  { name: 'Heart', path: '/avatars/heart.svg' },
  { name: 'Peace Sign', path: '/avatars/peace-sign.svg' },
  { name: 'Infinity', path: '/avatars/infinity.svg' },
  { name: 'Lightbulb', path: '/avatars/lightbulb.svg' },
  // Stylized Animals
  { name: 'Pig', path: '/avatars/pig.svg' },
  { name: 'Bee', path: '/avatars/bee.svg' },
  { name: 'Frog', path: '/avatars/frog.svg' },
  { name: 'Fox', path: '/avatars/fox.svg' },
  { name: 'Owl', path: '/avatars/owl.svg' },
  { name: 'Penguin', path: '/avatars/penguin.svg' },
  { name: 'Lion', path: '/avatars/lion.svg' },
  { name: 'Elephant', path: '/avatars/elephant.svg' },
  { name: 'Zebra', path: '/avatars/zebra.svg' },
  { name: 'Monkey', path: '/avatars/monkey.svg' },
  { name: 'Bear', path: '/avatars/bear.svg' },
  { name: 'Rabbit', path: '/avatars/rabbit.svg' },
  { name: 'Deer', path: '/avatars/deer.svg' },
  { name: 'Wolf', path: '/avatars/wolf.svg' },
  { name: 'Tiger', path: '/avatars/tiger.svg' },
  { name: 'Panda', path: '/avatars/panda.svg' },
  { name: 'Koala', path: '/avatars/koala.svg' },
  { name: 'Parrot', path: '/avatars/parrot.svg' },
  { name: 'Snake', path: '/avatars/snake.svg' },
  { name: 'Turtle', path: '/avatars/turtle.svg' },
  { name: 'Cat', path: '/avatars/cat.svg' },
  { name: 'Dog', path: '/avatars/dog.svg' },
  { name: 'Bird', path: '/avatars/bird.svg' },
  { name: 'Fish', path: '/avatars/fish.svg' },
  { name: 'Horse', path: '/avatars/horse.svg' },
  { name: 'Dragon', path: '/avatars/dragon.svg' },
  { name: 'Unicorn', path: '/avatars/unicorn.svg' },
];

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { settings, updateSetting, addNotification, selectBadge } = useSettings();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isPredefinedAvatarDialogOpen, setIsPredefinedAvatarDialogOpen] = React.useState(false);
  // Removed selectedCategory state as there's only one category now

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateSetting('userProfile', { ...settings.userProfile, [id]: value });
  };

  const handleSelectChange = (value: string, id: string) => {
    updateSetting('userProfile', { ...settings.userProfile, [id]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSetting('userProfile', { ...settings.userProfile, avatarUrl: reader.result as string });
        toast.success(t('profile_page.avatar_upload_success'));
        addNotification('profile_page.avatar_upload_success', 'notify_profile_update', {}, '/profile');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarDelete = () => {
    updateSetting('userProfile', { ...settings.userProfile, avatarUrl: '/placeholder.svg' });
    toast.info(t('profile_page.avatar_delete_success'));
    addNotification('profile_page.avatar_delete_success', 'notify_profile_update', {}, '/profile');
  };

  const getAvatarUnlockProgress = (avatarName: string): number => {
    switch (avatarName) {
      case 'Star': return 5;
      case 'Heart': return 10;
      case 'Peace Sign': return 15;
      case 'Infinity': return 20;
      case 'Lightbulb': return 25;
      case 'Pig': return 30;
      case 'Bee': return 35;
      case 'Frog': return 40;
      case 'Fox': return 45;
      case 'Owl': return 0; // Owl is unlocked by default
      case 'Penguin': return 50;
      case 'Lion': return 55;
      case 'Elephant': return 60;
      case 'Zebra': return 65;
      case 'Monkey': return 70;
      case 'Bear': return 75;
      case 'Rabbit': return 80;
      case 'Deer': return 85;
      case 'Wolf': return 90;
      case 'Tiger': return 95;
      case 'Panda': return 100;
      case 'Koala': return 100;
      case 'Parrot': return 100;
      case 'Snake': return 100;
      case 'Turtle': return 100;
      case 'Cat': return 100;
      case 'Dog': return 100;
      case 'Bird': return 100;
      case 'Fish': return 100;
      case 'Horse': return 100;
      case 'Dragon': return 100;
      case 'Unicorn': return 100;
      default: return 0; // Default placeholder is unlocked
    }
  };

  const handlePredefinedAvatarSelect = (avatarPath: string, avatarName: string, isLocked: boolean) => {
    if (isLocked) {
      const unlockProgress = getAvatarUnlockProgress(avatarName);
      toast.error(t('profile_page.avatar_locked_error', { avatar: t(`profile_page.avatar_name_${avatarName.toLowerCase().replace(/\s/g, '_')}`), progress: unlockProgress }));
      return;
    }
    updateSetting('userProfile', { ...settings.userProfile, avatarUrl: avatarPath });
    toast.success(t('notifications_page.notify_predefined_avatar_selected_message', { avatar: avatarName }));
    addNotification('notify_predefined_avatar_selected_message', 'notify_predefined_avatar_selected', { avatar: avatarName }, '/profile');
    setIsPredefinedAvatarDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CircleCheck className="h-4 w-4 text-green-500" />;
      case 'busy': return <CircleDot className="h-4 w-4 text-red-500" />;
      case 'away': return <CircleMinus className="h-4 w-4 text-yellow-500" />;
      case 'invisible': return <CircleOff className="h-4 w-4 text-gray-500" />;
      case 'in_ai_session': return <Sparkles className="h-4 w-4 mr-2 text-purple-500" />;
      case 'creation_in_progress': return <Layers className="h-4 w-4 mr-2 text-blue-500" />;
      default: return <CircleCheck className="h-4 w-4 text-green-500" />;
    }
  };

  const handleSaveChanges = () => {
    toast.success(t('profile_page.save_success'));
    addNotification('profile_page.save_success', 'notify_profile_update', {}, '/profile');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveChanges();
    }
  };

  // Now all avatars are displayed without category filtering
  const displayedAvatars = predefinedAvatars;

  const selectedBadgeData = settings.selectedBadge ? allBadgesData.find(b => b.name === settings.selectedBadge) : undefined;

  // Removed avatarCategories as there's only one category now

  return (
    <div className={cn("container mx-auto p-4 pt-8", settings.compactMode && 'max-w-2xl')}>
      <h1 className="text-4xl font-bold mb-8 text-center">{t('profile_page.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <DynamicCard className="lg:col-span-3 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{t('profile_page.personal_info_title')}</CardTitle>
            <Button onClick={handleSaveChanges}>{t('profile_page.save_changes_button')}</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-2 border-primary">
                  <AvatarImage src={settings.userProfile.avatarUrl} alt={settings.userProfile.name} />
                  <AvatarFallback>{settings.userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {selectedBadgeData && (
                  <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 border border-primary shadow-md">
                    <selectedBadgeData.icon className="h-8 w-8" style={{ color: selectedBadgeData.color }} />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => fileInputRef.current?.click()}>{t('profile_page.upload_photo_button')}</Button>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Button variant="outline" onClick={() => setIsPredefinedAvatarDialogOpen(true)}>{t('profile_page.choose_predefined_avatar_button')}</Button>
                <Button variant="outline" onClick={handleAvatarDelete}>{t('profile_page.delete_avatar_button')}</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('profile_page.name_label')}</Label>
                <Input id="name" value={settings.userProfile.name} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
              </div>
              <div>
                <Label htmlFor="nickname">{t('profile_page.nickname_label')}</Label>
                <Input id="nickname" value={settings.userProfile.nickname} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
              </div>
            </div>

            <div>
              <Label htmlFor="email">{t('profile_page.email_label')}</Label>
              <Input id="email" type="email" value={settings.userProfile.email} onChange={handleInputChange} placeholder={t('profile_page.email_placeholder')} onKeyDown={handleInputKeyDown} />
            </div>

            <div>
              <Label htmlFor="bio">{t('profile_page.bio_label')}</Label>
              <Textarea id="bio" value={settings.userProfile.bio} onChange={handleInputChange} placeholder={t('profile_page.bio_placeholder')} rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">{t('profile_page.status_label')}</Label>
                <Select value={settings.userProfile.status} onValueChange={(value) => handleSelectChange(value, 'status')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('profile_page.select_status_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online" className="flex items-center"><CircleCheck className="h-4 w-4 mr-2 text-green-500" /> {t('profile_page.status_online')}</SelectItem>
                    <SelectItem value="busy" className="flex items-center"><CircleDot className="h-4 w-4 mr-2 text-red-500" /> {t('profile_page.status_busy')}</SelectItem>
                    <SelectItem value="away" className="flex items-center"><CircleMinus className="h-4 w-4 mr-2 text-yellow-500" /> {t('profile_page.status_away')}</SelectItem>
                    <SelectItem value="invisible" className="flex items-center"><CircleOff className="h-4 w-4 mr-2 text-gray-500" /> {t('profile_page.status_invisible')}</SelectItem>
                    <SelectItem value="in_ai_session" className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-purple-500" /> {t('profile_page.status_in_ai_session')}</SelectItem>
                    <SelectItem value="creation_in_progress" className="flex items-center"><Layers className="h-4 w-4 mr-2 text-blue-500" /> {t('profile_page.status_creation_in_progress')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender">{t('profile_page.gender_label')}</Label>
                <Select value={settings.userProfile.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('profile_page.select_gender_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('profile_page.gender_male')}</SelectItem>
                    <SelectItem value="trans">{t('profile_page.gender_trans')}</SelectItem>
                    <SelectItem value="female">{t('profile_page.gender_female')}</SelectItem>
                    <SelectItem value="non-binary">{t('profile_page.gender_non_binary')}</SelectItem>
                    <SelectItem value="prefer_not-to-say">{t('profile_page.gender_prefer_not_to_say')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </DynamicCard>
      </div>

      {/* Predefined Avatar Dialog */}
      <Dialog open={isPredefinedAvatarDialogOpen} onOpenChange={setIsPredefinedAvatarDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{t('profile_page.predefined_avatars_title')}</DialogTitle>
            <CardDescription>{t('profile_page.predefined_avatars_description')}</CardDescription>
          </DialogHeader>
          {/* Removed category selection buttons */}
          <ScrollArea className="flex-grow overflow-y-auto p-4">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {displayedAvatars.map((avatar) => {
                const unlockProgress = getAvatarUnlockProgress(avatar.name);
                // Corrected: Check if avatar.path is NOT in unlockedAvatars AND overallProgress is less than unlockProgress
                const isLocked = !settings.unlockedAvatars.includes(avatar.path) && settings.overallProgress < unlockProgress;

                return (
                  <TooltipProvider key={avatar.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex flex-col items-center justify-center h-24 w-24 p-2 relative",
                            isLocked && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => handlePredefinedAvatarSelect(avatar.path, avatar.name, isLocked)}
                          disabled={isLocked}
                        >
                          <img src={avatar.path} alt={avatar.name} className="h-12 w-12 mb-1 object-contain" />
                          <span className="text-xs text-center truncate w-full">{t(`profile_page.avatar_name_${avatar.name.toLowerCase().replace(/\s/g, '_').replace(/ /g, '_')}`)}</span>
                          {isLocked && (
                            <Lock className="absolute h-6 w-6 text-foreground" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      {isLocked && (
                        <TooltipContent side="bottom">
                          <p>{t('profile_page.avatar_locked_tooltip', { avatar: t(`profile_page.avatar_name_${avatar.name.toLowerCase().replace(/\s/g, '_').replace(/ /g, '_')}`), progress: unlockProgress })}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPredefinedAvatarDialogOpen(false)}>{t('profile_page.cancel_button')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;