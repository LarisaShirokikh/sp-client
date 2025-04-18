"use client"

import { useForumContext } from "@/app/providers/ForumProvider";

const CategoriesList = () => {
  const { 
    categories, 
    topics, 
    activeCategory, 
    setActiveCategory,
    categoryColors
  } = useForumContext();

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Категории</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const categoryName = category.name;
          const topicsCount = topics.filter(t => {
            const topicCategory = categories.find(cat => cat.id === t.category_id);
            return topicCategory?.name === categoryName;
          }).length;
          
          return (
            <div 
              key={category.id} 
              className={`rounded-xl p-4 border hover:shadow-md transition-shadow cursor-pointer ${
                activeCategory === categoryName 
                  ? 'border-purple-300 bg-purple-50' 
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setActiveCategory(categoryName === activeCategory ? 'all' : categoryName)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">{categoryName}</h3>
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  categoryColors[categoryName]?.split(' ')[0] || categoryColors.default.split(' ')[0]
                }`}>
                  {topicsCount}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {category.description || `Обсуждение тем, связанных с ${categoryName.toLowerCase()}`}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesList;