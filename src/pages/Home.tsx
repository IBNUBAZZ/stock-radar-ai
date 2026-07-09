import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/use-language';
import { Search, Pill, Laptop, Flower2, Smartphone, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const CATEGORIES = [
  { id: 'medicines', key: 'category.medicines', icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'laptops', key: 'category.laptops', icon: Laptop, color: 'text-primary', bg: 'bg-primary/5' },
  { id: 'perfumes', key: 'category.perfumes', icon: Flower2, color: 'text-green-700', bg: 'bg-green-100/50' },
  { id: 'tech-gadgets', key: 'category.tech-gadgets', icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export function Home() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e?: React.FormEvent, category?: string) => {
    e?.preventDefault();
    const q = category || query;
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}${category ? `&cat=${category}` : ''}`);
    }
  };

  return (
    <div className="space-y-10 py-6">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary font-bold rounded-full">
          Sokoto Edition
        </Badge>
        <h1 className="text-5xl font-black tracking-tight text-primary sm:text-6xl">
          {t('app.name')}
        </h1>
        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-bold text-foreground max-w-md mx-auto leading-tight">
            {t('home.hero')}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground italic font-medium">
            {language === 'en' ? t('app.tagline.ha') : t('app.tagline.en')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            className="pl-12 h-16 text-lg rounded-2xl border-2 focus-visible:ring-primary shadow-lg border-primary/10"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-2 h-12 rounded-xl px-6 font-bold"
          >
            {t('search.button')}
          </Button>
        </div>
        <p className="mt-4 text-xs text-center text-muted-foreground font-medium uppercase tracking-wider">
          💡 {t('smart_search.hint')}
        </p>
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center sm:text-left">{t('home.categories')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Card 
              key={cat.id} 
              className="cursor-pointer hover:shadow-xl transition-all border-none shadow-sm overflow-hidden group hover:-translate-y-1"
              onClick={() => handleSearch(undefined, cat.id)}
            >
              <CardContent className={`p-8 flex flex-col items-center gap-4 ${cat.bg}`}>
                <div className={`p-5 rounded-3xl bg-white shadow-md group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`w-10 h-10 ${cat.color}`} />
                </div>
                <span className="font-black text-xl text-foreground">{t(cat.key)}</span>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-primary rounded-[2rem] p-10 text-primary-foreground text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/67fecc3a-c453-498e-b61a-6036086c93bb/sokoto-pharmacy-bg-e9cd6a20-1782721173859.webp" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col gap-2 items-center">
            <Badge variant="secondary" className="bg-white text-primary hover:bg-white border-none px-4 py-1 font-black text-xs uppercase tracking-widest">{t('ussd.badge')}</Badge>
          </div>
          <h2 className="text-3xl font-black sm:text-4xl">{t('ussd.dial')}</h2>
          <div className="text-5xl font-mono font-black tracking-tighter bg-black/20 inline-block px-8 py-4 rounded-3xl border border-white/20 backdrop-blur-sm">
            {t('ussd.code')}
          </div>
          <p className="text-primary-foreground/80 max-w-sm mx-auto font-medium leading-relaxed">
            {language === 'en' 
              ? 'No smartphone? No problem. Search for products and find stores near you using any phone.' 
              : 'Ba ka da wayar salula? Babu matsala. Nemo kaya da kantuna kusa da kai da kowace irin waya.'}
          </p>
          <Button 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 font-black rounded-xl px-8 h-12 shadow-lg"
            onClick={() => navigate('/ussd')}
          >
            {language === 'en' ? 'Try Simulator' : 'Gwada Simulator'} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}