import ProductList from "@/components/productList";
import TabNavigation from "@/components/tabNavigation";


export const metadata = {
  title: 'Продукты | Мой Next.js проект',
  description: 'Список всех доступных продуктов',
};

export default function ProductsPage() {
  const tabs = [
    { id: 'all', label: 'Все' },
    { id: 'new', label: 'Новые' },
    { id: 'popular', label: 'Популярные' },
  ];

  // Пример данных продуктов
  const products = [
    { id: 1, name: 'Продукт 1', price: 100, category: 'new' },
    { id: 2, name: 'Продукт 2', price: 200, category: 'popular' },
    { id: 3, name: 'Продукт 3', price: 300, category: 'new' },
    // ... другие продукты
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Наши продукты</h1>
      <TabNavigation tabs={tabs} defaultActiveTab="all" />
      <div className="mt-6">
        <ProductList products={products} />
      </div>
    </div>
  );
}