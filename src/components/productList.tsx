"use client";

const ProductList = ({ products }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Популярные товары</h3>
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">В каталог</a>
      </div>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{product.price.toLocaleString()} ₽</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <svg className="text-yellow-400 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1">{product.rating}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <span>{product.orders} заказов</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Добавить в заказ
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;