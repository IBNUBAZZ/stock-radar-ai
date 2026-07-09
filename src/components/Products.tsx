import { Product } from '../constants/data';
import { useLanguage } from '../hooks/use-language';

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const { t, language } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg">
          <img src={product.image} alt={product.name} className="object-cover w-full h-48 mb-4 rounded" />
          <h2 className="text-xl font-bold">{language === 'ha' ? product.name_ha : product.name}</h2>
          <p className="text-gray-500">{t(`category.${product.category}`)}</p>
          <p className="mt-2 text-lg font-semibold">{`₦${product.price.toLocaleString()}`}</p>
          <p className={`mt-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? t('status.in_stock') : t('status.out_of_stock')}
          </p>
          <p className="mt-2 text-sm text-gray-700">{language === 'ha' ? product.description_ha : product.description}</p>
        </div>
      ))}
    </div>
  );
}
