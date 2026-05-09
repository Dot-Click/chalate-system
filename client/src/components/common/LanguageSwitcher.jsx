import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageProvider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const activeLang = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all focus:outline-none border border-white/10 bg-white/5 backdrop-blur-md shadow-lg group">
          <Globe className="w-4 h-4 text-gold-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold text-white tracking-widest uppercase">{activeLang.code}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-[160px] bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-1.5 z-[100] animate-in fade-in zoom-in duration-200"
        sideOffset={8}
        align="end"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-sm rounded-xl cursor-pointer outline-none transition-all mb-1 last:mb-0",
              currentLanguage === lang.code 
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/30" 
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            )}
            onClick={() => changeLanguage(lang.code)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{lang.flag}</span>
              <span className="font-semibold tracking-wide">{lang.name}</span>
            </div>
            {currentLanguage === lang.code && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
