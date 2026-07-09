import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/use-language';
import { MOCK_PRODUCTS, MOCK_STORES, SMART_SEARCH_MAP } from '../constants/data';
import { ArrowLeft, MapPin, Phone, MessageCircle, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat');

  const results = useMemo(() => {
    let filtered = MOCK_PRODUCTS;

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      
      // Smart search logic
      let searchTerms = [lowerQuery];
      Object.entries(SMART_SEARCH_MAP).forEach(([key, values]) => {
        if (lowerQuery.includes(key)) {
          searchTerms = [...searchTerms, ...values.map(v => v.toLowerCase())];
        }
      });

      filtered = filtered.filter(p => 
        searchTerms.some(term => 
          p.name.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          (p.name_ha && p.name_ha.toLowerCase().includes(term))
        )
      );
    }

    return filtered.map(p => ({
      ...p,
      store: MOCK_STORES.find(s => s.id === p.storeId)!
    }));
  }, [query, category]);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4 bg-background sticky top-16 z-40 py-4 border-b -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-none">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black truncate">
            {query ? `"${query}"` : t('home.categories')}
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {results.length} {results.length === 1 ? 'Item' : 'Items'} Found
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 space-y-6 bg-muted/30 rounded-3xl border-2 border-dashed">
          <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Info className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-bold">{t('search.no_results')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">Try searching for something else like "Panadol" or "Laptop".</p>
          </div>
          <Button onClick={() => navigate('/')} className="rounded-full px-8">{t('back')}</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map((product) => (
            <Card key={product.id} className="overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all group rounded-2xl">
              <CardContent className="p-0 flex flex-col sm:flex-row">
                <div className="w-full sm:w-40 h-40 flex-shrink-0 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <Badge variant="destructive" className="font-bold text-xs uppercase tracking-tighter scale-110">
                        {t('status.out_of_stock')}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-black text-xl leading-tight text-foreground group-hover:text-primary transition-colors">
                        {language === 'ha' && product.name_ha ? product.name_ha : product.name}
                      </h3>
                      {product.inStock && (
                        <Badge 
                          variant="default"
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold text-[10px] uppercase tracking-wider"
                        >
                          {t('status.in_stock')}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate">{product.store.name}</span>
                      <span className="text-primary/30">•</span>
                      <span className="text-primary">{product.store.distance} {t('distance')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-dashed">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Price</span>
                      <span className="text-2xl font-black text-primary leading-none">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-10 w-10 p-0 rounded-xl border-primary/20 text-primary hover:bg-primary/5"
                        onClick={() => window.open(`tel:${product.store.phone}`)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-10 w-10 p-0 rounded-xl border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        onClick={() => window.open(`https://wa.me/${product.store.whatsapp}`)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="rounded-xl px-5 font-bold shadow-md"
                        onClick={() => navigate(`/store/${product.store.id}`)}
                      >
                        {language === 'en' ? 'Details' : 'Bayanai'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}