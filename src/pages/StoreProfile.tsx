import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/use-language';
import { MOCK_STORES, MOCK_PRODUCTS } from '../constants/data';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, Map as MapIcon, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export function StoreProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const store = MOCK_STORES.find(s => s.id === id);
  const products = MOCK_PRODUCTS.filter(p => p.storeId === id);

  if (!store) {
    return <div className="text-center py-20 font-bold">Store not found.</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-black truncate">{store.name}</h1>
      </div>

      <Card className="border-none shadow-2xl overflow-hidden rounded-[2rem] bg-primary relative">
        <div className="h-56 relative group">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/67fecc3a-c453-498e-b61a-6036086c93bb/sokoto-pharmacy-bg-e9cd6a20-1782721173859.webp" 
            alt="Storefront"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent flex flex-col justify-end p-8 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Verified Sokoto Merchant</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight">{store.name}</h2>
            <p className="flex items-center gap-1.5 text-sm font-bold opacity-90 mt-1 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              {store.address}
            </p>
          </div>
        </div>
        <CardContent className="p-8 grid grid-cols-2 gap-4 bg-background">
          <Button 
            className="w-full gap-3 h-14 rounded-2xl font-black text-lg shadow-lg bg-emerald-600 hover:bg-emerald-700" 
            size="lg" 
            onClick={() => window.open(`https://wa.me/${store.whatsapp}`)}
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp
          </Button>
          <Button 
            variant="outline" 
            className="w-full gap-3 h-14 rounded-2xl font-black text-lg border-2 border-primary/20 hover:bg-primary/5" 
            size="lg" 
            onClick={() => window.open(`tel:${store.phone}`)}
          >
            <Phone className="w-6 h-6" />
            {t('call')}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border border-primary/5 shadow-sm flex items-center p-6 gap-4 rounded-3xl">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.15em]">{t('hours')}</p>
            <p className="text-lg font-bold">{store.hours}</p>
          </div>
        </Card>
        <Card className="border border-primary/5 shadow-sm flex items-center p-6 gap-4 rounded-3xl">
          <div className="p-3 rounded-2xl bg-primary/5 text-primary">
            <MapIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.15em]">{t('view.map')}</p>
            <p className="text-lg font-bold">{store.distance} {t('distance')}</p>
          </div>
        </Card>
      </div>

      <Separator className="opacity-10" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black">{t('dashboard.inventory')}</h3>
          <Badge variant="outline" className="rounded-full px-4 border-primary/20 text-primary font-bold">{products.length} {language === 'en' ? 'Items' : 'Kayan'}</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="group flex items-center justify-between p-4 rounded-2xl border-2 border-primary/5 bg-card hover:border-primary/20 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted border border-primary/5">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div>
                  <p className="font-black text-lg group-hover:text-primary transition-colors">
                    {language === 'ha' && product.name_ha ? product.name_ha : product.name}
                  </p>
                  <p className="text-primary font-black">₦{product.price.toLocaleString()}</p>
                </div>
              </div>
              <Badge 
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-emerald-100 text-emerald-700 border-none font-bold text-xs uppercase px-3" : "font-bold text-xs uppercase px-3"}
              >
                {product.inStock ? t('status.in_stock') : t('status.out_of_stock')}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}