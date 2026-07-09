import React, { useState } from 'react';
import { useLanguage } from '../hooks/use-language';
import { Phone, CornerDownRight, Hash, Globe, WifiOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

type USSDScreen = 'dial' | 'main' | 'search' | 'results' | 'store';

export function USSDSimulator() {
  const { t, language } = useLanguage();
  const [screen, setScreen] = useState<USSDScreen>('dial');
  const [dialCode, setDialCode] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleDial = (num: string) => {
    if (dialCode.length < 11) setDialCode(prev => prev + num);
  };

  const submitDial = () => {
    if (dialCode === '*384*7625#') {
      setScreen('main');
    } else {
      alert(language === 'en' ? 'Invalid USSD code. Try *384*7625#' : 'Lambar USSD ba ta da kyau. Gwada *384*7625#');
      setDialCode('');
    }
  };

  const handleInputSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const val = inputValue.trim();
      setInputValue('');
      if (screen === 'main') {
        if (val === '1') setScreen('search');
        else if (val === '2') setScreen('results');
        else if (val === '4') {
          // Toggle language in simulator context (though it uses the global hook)
          alert(language === 'en' ? 'Changing to Hausa...' : 'Ana komawa Turanci...');
        }
      } else if (screen === 'search') {
        setScreen('results');
      } else if (screen === 'results') {
        if (val === '1' || val === '2') setScreen('store');
      } else if (screen === 'store') {
        if (val === '3') setScreen('main');
      }
    }
  };

  const renderPhoneScreen = () => {
    switch (screen) {
      case 'dial':
        return (
          <div className="h-full flex flex-col justify-between p-6 bg-gray-100">
            <div className="flex-1 flex flex-col items-center justify-center space-y-2">
              <div className="text-3xl font-mono font-black tracking-widest text-gray-800">{dialCode || 'Dial Code'}</div>
              {!dialCode && <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest animate-pulse">Enter *384*7625#</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((n) => (
                <button 
                  key={n} 
                  onClick={() => handleDial(n.toString())}
                  className="h-12 rounded-2xl bg-white shadow-md active:bg-gray-200 active:scale-95 transition-all flex items-center justify-center font-black text-lg text-gray-700 border border-gray-200/50"
                >
                  {n}
                </button>
              ))}
              <div className="col-span-3 mt-4 flex gap-3">
                <Button variant="ghost" className="flex-1 h-12 rounded-2xl font-black text-gray-400" onClick={() => setDialCode('')}>{language === 'en' ? 'Clear' : 'Goge'}</Button>
                <Button className="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-lg font-black" onClick={submitDial}>
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Call' : 'Kira'}
                </Button>
              </div>
            </div>
          </div>
        );
      case 'main':
        return (
          <div className="h-full flex flex-col p-6 bg-black text-emerald-500 font-mono text-xs leading-relaxed">
            <div className="mb-4 border-b border-emerald-500/30 pb-2 flex items-center justify-between">
              <span className="font-black">STOCKNEAR SOKOTO</span>
              <WifiOff className="w-3 h-3" />
            </div>
            <div className="space-y-1 mb-4">
              <div className="text-white font-bold">{t('ussd.welcome')}</div>
              <div className="opacity-80">------------------</div>
              <div>{t('ussd.opt1')}</div>
              <div>{t('ussd.opt2')}</div>
              <div>{t('ussd.opt3')}</div>
              <div>{t('ussd.opt4')}</div>
            </div>
            <div className="mt-2 flex items-center gap-2 bg-emerald-500/10 p-2 rounded">
              <span className="animate-pulse">{'>'}</span>
              <input 
                autoFocus
                className="bg-transparent border-none outline-none w-full text-white font-bold" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
              />
            </div>
            <div className="mt-auto flex justify-between text-[10px] font-black tracking-widest pt-4 border-t border-emerald-500/20">
              <button onClick={() => setScreen('dial')} className="hover:text-white">{language === 'en' ? 'CANCEL' : 'SOKE'}</button>
              <button className="text-white">OK</button>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="h-full flex flex-col p-6 bg-black text-emerald-500 font-mono text-xs">
            <div className="mb-4 text-white font-bold">{t('ussd.enter_product')}</div>
            <div className="mt-2 flex items-center gap-2 bg-emerald-500/10 p-2 rounded">
              <span>{'>'}</span>
              <input 
                autoFocus 
                className="bg-transparent border-none outline-none w-full text-white font-bold" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
              />
            </div>
            <div className="mt-auto flex justify-between text-[10px] font-black tracking-widest pt-4 border-t border-emerald-500/20">
              <button onClick={() => setScreen('main')} className="hover:text-white">{language === 'en' ? 'BACK' : 'BAYA'}</button>
              <button onClick={() => setScreen('results')} className="text-white">SEARCH</button>
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="h-full flex flex-col p-6 bg-black text-emerald-500 font-mono text-xs">
            <div className="mb-4 text-white font-bold">{t('ussd.results_for')} "Lonart":</div>
            <div className="space-y-2">
              <div className="p-1 border border-emerald-500/20">1. Lonart - Sokoto Central</div>
              <div className="p-1 border border-emerald-500/20">2. Lonart - Rima River</div>
            </div>
            <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 p-2 rounded">
              <span>{'>'}</span>
              <input 
                autoFocus 
                className="bg-transparent border-none outline-none w-full text-white font-bold" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
              />
            </div>
            <div className="mt-auto flex justify-between text-[10px] font-black tracking-widest pt-4 border-t border-emerald-500/20">
              <button onClick={() => setScreen('main')} className="hover:text-white">{language === 'en' ? 'CANCEL' : 'SOKE'}</button>
              <button className="text-white font-bold">SELECT</button>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="h-full flex flex-col p-6 bg-black text-emerald-500 font-mono text-[10px] leading-tight">
            <div className="font-bold border-b border-emerald-500 mb-2 pb-1 text-white text-xs">LONART - IN STOCK</div>
            <div className="space-y-1 opacity-90 mb-4">
              <div>STORE: Sokoto Central Pharmacy</div>
              <div>PRICE: ₦2,500</div>
              <div>ADDR: Sultan Abubakar Rd</div>
              <div>PHONE: 08012345678</div>
            </div>
            <div className="space-y-1">
              <div className="text-white font-bold">1. {t('ussd.call_store')}</div>
              <div className="text-white font-bold">2. {t('ussd.sms_directions')}</div>
              <div className="text-white font-bold">3. {language === 'en' ? 'Main Menu' : 'Babban Shafi'}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 p-2 rounded">
              <span>{'>'}</span>
              <input 
                autoFocus 
                className="bg-transparent border-none outline-none w-full text-white font-bold" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-16 py-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="bg-primary/10 p-4 rounded-3xl">
          <WifiOff className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">{t('ussd.title')}</h1>
          <p className="text-muted-foreground max-w-lg font-medium leading-relaxed">
            Over 60% of people in Sokoto use feature phones. StockNear's USSD protocol ensures everyone can find life-saving medicines without an internet connection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
        <div className="flex justify-center order-2 lg:order-1">
          <div className="relative w-80 h-[640px] bg-gray-900 rounded-[3.5rem] border-[12px] border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-2">
            <div className="h-6 w-32 bg-gray-800 mx-auto rounded-b-3xl mb-4 relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex-1 mx-2 mb-12 rounded-[2rem] bg-black overflow-hidden border-4 border-gray-800 shadow-inner">
              {renderPhoneScreen()}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-xl">
              <div className="w-5 h-5 rounded-md border-2 border-gray-600"></div>
            </div>
          </div>
        </div>

        <div className="space-y-10 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Hash className="w-6 h-6 text-primary" />
              {t('ussd.nav')}
            </h2>
            
            <div className="space-y-8 border-l-4 border-primary/10 pl-8 ml-3">
              <div className="relative">
                <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"></div>
                <div className="font-black text-primary font-mono text-2xl tracking-tighter">{t('ussd.code')}</div>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1">Universal Access Code</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Works on any mobile network in Nigeria (MTN, Airtel, Glo, 9mobile).</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-background shadow-lg"></div>
                <div className="font-black text-lg">Bilingual Interface</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">The system automatically detects preferred language or prompts the user to choose between English and Hausa.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-background shadow-lg"></div>
                <div className="font-black text-lg">AI-Powered Search</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Even via USSD, our backend uses fuzzy matching to understand local names for medicines and products.</p>
              </div>
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/10 shadow-none rounded-[2rem] p-4">
            <CardContent className="p-6 flex gap-5 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">!</div>
              <div className="space-y-2">
                <p className="font-black uppercase tracking-widest text-xs text-primary">Inclusivity Report</p>
                <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                  By providing a USSD bridge, StockNear Sokoto ensures that even the most vulnerable populations can find essential goods during shortages.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="px-4 py-2 rounded-full font-bold">#OfflineSearch</Badge>
            <Badge variant="secondary" className="px-4 py-2 rounded-full font-bold">#SokotoTech</Badge>
            <Badge variant="secondary" className="px-4 py-2 rounded-full font-bold">#USSD</Badge>
            <Badge variant="secondary" className="px-4 py-2 rounded-full font-bold">#HausaTech</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}