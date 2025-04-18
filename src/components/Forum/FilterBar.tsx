"use client"
import { useForumContext } from '@/app/providers/ForumProvider';
import { Search, Filter } from 'lucide-react';

const FilterBar = () => {
  const { 
    categories, 
    activeCategory, 
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useForumContext();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Поиск тем..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Categories Filter */}
        <div className="relative min-w-[180px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Все категории</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="min-w-[150px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'active')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="newest">Новые</option>
            <option value="popular">Популярные</option>
            <option value="active">Активные</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;