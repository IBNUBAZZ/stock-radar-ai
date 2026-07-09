import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/use-language';
import { MOCK_PRODUCTS, Product } from '../constants/data';
import { Plus, Trash2, Edit2, Check, LayoutDashboard, Package, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function Dashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('stocknear_inventory_sokoto');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      // Initialize with products for store 's1' for demo
      const initial = MOCK_PRODUCTS.filter(p => p.storeId === 's1');
      setProducts(initial);
      localStorage.setItem('stocknear_inventory_sokoto', JSON.stringify(initial));
    }
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('stocknear_inventory_sokoto', JSON.stringify(updated));
  };

  const toggleStock = (id: string) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    saveProducts(updated);
    toast.success(language === 'en' ? 'Stock status updated' : 'An sabunta matsayin kaya');
  };

  const updatePrice = (id: string, price: number) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, price } : p
    );
    saveProducts(updated);
    setIsEditing(null);
    toast.success(language === 'en' ? 'Price updated' : 'An sabunta farashi');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              {t('dashboard.title')}
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sokoto Central Pharmacy</p>
          </div>
        </div>
        <Button className="gap-2 rounded-xl font-bold h-11 px-6 shadow-lg">
          <Plus className="w-5 h-5" />
          {t('dashboard.add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Total Items</CardTitle>
            <Package className="w-4 h-4 opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black">{products.length}</div>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-white/70">
              <TrendingUp className="w-3 h-3" />
              <span>+2 this week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-emerald-50 rounded-[2rem] border-2 border-emerald-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-emerald-600">
              {products.filter(p => p.inStock).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-destructive/5 rounded-[2rem] border-2 border-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-destructive uppercase tracking-[0.2em]">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-destructive">
              {products.filter(p => !p.inStock).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b bg-muted/30 px-8 py-6">
          <CardTitle className="flex items-center gap-3 text-xl font-black">
            <Package className="w-6 h-6 text-primary" />
            {t('dashboard.inventory')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {products.map((product) => (
              <div key={product.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex-shrink-0 overflow-hidden border border-primary/5">
                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">
                      {language === 'ha' && product.name_ha ? product.name_ha : product.name}
                    </h3>
                    {isEditing === product.id ? (
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          type="number" 
                          defaultValue={product.price}
                          className="h-10 w-32 rounded-xl font-bold border-primary/20"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updatePrice(product.id, Number((e.target as HTMLInputElement).value));
                            }
                          }}
                        />
                        <Button size="icon" className="h-10 w-10 rounded-xl" onClick={() => setIsEditing(null)}>
                          <Check className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xl font-black text-primary">
                          ₦{product.price.toLocaleString()}
                        </p>
                        <button 
                          onClick={() => setIsEditing(product.id)} 
                          className="p-2 hover:bg-primary/5 rounded-full text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8 bg-muted/30 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Label htmlFor={`stock-${product.id}`} className="text-sm font-black uppercase tracking-wider cursor-pointer">
                      {product.inStock ? t('status.in_stock') : t('status.out_of_stock')}
                    </Label>
                    <Switch 
                      id={`stock-${product.id}`}
                      checked={product.inStock}
                      onCheckedChange={() => toggleStock(product.id)}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}