// src/app/admin/forum/topics/page.tsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Edit, Trash, AlertTriangle } from 'lucide-react';

import { Topic, Category } from '@/app/interface/forum';
import { AdminNav } from '@/components/Admin/AdminNav';
import { AdminHeader } from '@/components/Admin/AdminHeader';

export default function TopicsManagementPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsRes = await fetch('/api/forum/topics?admin=true');
        const categoriesRes = await fetch('/api/forum/categories');
        
        if (!topicsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const topicsData = await topicsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setTopics(topicsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching forum data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDeleteTopic = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить эту тему и все связанные с ней ответы?')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/forum/topics/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete topic');
      }
      
      setTopics(topics.filter(topic => topic.id !== id));
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleHighlightTopic = async (id, isHighlighted) => {
    try {
      const res = await fetch(`/api/forum/topics/${id}/highlight`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isHighlighted: !isHighlighted }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to update topic');
      }
      
      setTopics(topics.map(topic => 
        topic.id === id ? { ...topic, isHot: !isHighlighted } : topic
      ));
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const filteredTopics = topics.filter(topic => {
    const matchesFilter = filter === 'all' || 
                        (filter === 'flagged' && topic.isFlagged) ||
                        (filter === 'highlighted' && topic.isHot) ||
                        topic.category === filter;
                        
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.author.name.toLowerCase().includes(searchQuery.toLowerCase());
                         
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="flex-1">
        <AdminHeader />
        
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/admin/forum" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Назад к управлению форумом
            </Link>
            
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Управление темами форума</h1>
            </div>
          </div>
          
          {/* Filters and search */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Поиск тем..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Все темы</option>
                  <option value="flagged">Помеченные</option>
                  <option value="highlighted">Выделенные</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Загрузка тем...</p>
            </div>
          ) : filteredTopics.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">Темы не найдены</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тема
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Автор
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статистика
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTopics.map((topic) => (
                    <tr key={topic.id} className={topic.isFlagged ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {topic.isFlagged && (
                            <AlertTriangle size={16} className="text-red-500 mr-2" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {topic.title}
                              {topic.isHot && (
                                <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                                  Горячая тема
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              Создано: {topic.createdAt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={topic.author.avatar_url} 
                              alt={topic.author.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {topic.author.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Ответов: {topic.replies}</div>
                        <div>Просмотров: {topic.views}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/forum/topic/${topic.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          target="_blank"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleHighlightTopic(topic.id, topic.isHot)}
                          className={`mr-2 ${topic.isHot ? 'text-red-600' : 'text-gray-600'} hover:text-gray-900`}
                          title={topic.isHot ? 'Снять выделение' : 'Выделить тему'}
                        >
                          ★
                        </button>
                        <Link 
                          href={`/admin/forum/topics/edit/${topic.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}