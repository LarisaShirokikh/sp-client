"use client"
import type { NextPage } from 'next';
import { ForumProvider } from './providers/ForumProvider';
import PopularTopics from '@/components/Forum/TopicsPreview';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">М</span>
              </div>
              <span className="font-bold text-xl text-gray-900">МамПортал</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Поиск в МамПортал"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.584 10.587a2.5 2.5 0 013.415 3.415l-2.5 2.5a2.5 2.5 0 01-3.536-3.536l1.06-1.06z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">У</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-3 space-y-1">
            {/* Main Navigation */}
            <div className="mb-4">
              <div className="flex items-center gap-3 px-3 py-2 text-gray-900 hover:bg-gray-100 rounded cursor-pointer">
                <div className="w-5 h-5 text-purple-500">🏠</div>
                <span className="font-medium">Главная</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <div className="w-5 h-5 text-orange-500">🔥</div>
                <span>Популярное</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <div className="w-5 h-5 text-blue-500">💬</div>
                <span>Мои обсуждения</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <div className="w-5 h-5 text-green-500">🛒</div>
                <span>Совместные покупки</span>
              </div>
            </div>

            {/* Recent Communities */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Недавние сообщества
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {[
                { name: 'Беременность и роды', icon: '🤱', members: '12.5k' },
                { name: 'Новорожденные', icon: '👶', members: '8.2k' },
                { name: 'Детское питание', icon: '🍼', members: '6.1k' },
                { name: 'Развитие ребенка', icon: '🧸', members: '9.8k' },
                { name: 'Здоровье малышей', icon: '🏥', members: '5.7k' }
              ].map((community, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  <span className="text-lg">{community.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{community.name}</div>
                    <div className="text-xs text-gray-500">{community.members} участников</div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Communities */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Мои сообщества
                </span>
                <button className="text-purple-500 hover:text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded text-left">
                <span className="text-sm">+ Создать сообщество</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          {/* Community Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-20"></div>
          <div className="bg-white border-b border-gray-200 px-6 pb-4">
            <div className="flex items-center gap-4 -mt-6">
              <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">👶</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">м/МамПортал</h1>
                <p className="text-gray-600">Сообщество для мам и пап</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-medium transition-colors">
                  + Создать пост
                </button>
                <button className="border border-purple-500 text-purple-500 hover:bg-purple-50 px-4 py-2 rounded-full font-medium transition-colors">
                  Присоединиться
                </button>
              </div>

              <div className="flex items-center gap-4">
                <select className="bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Лучшие</option>
                  <option>Новые</option>
                  <option>Популярные</option>
                  <option>Обсуждаемые</option>
                </select>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="bg-gray-100">
            <ForumProvider>
              <div className="space-y-2 p-4">
                {/* Sample Posts */}
                {[
                  {
                    author: "u/AnnaMama",
                    community: "м/Беременность",
                    time: "3 ч. назад",
                    title: "Мой малыш назвал меня своим героем сегодня за то, что я ничего героического не делала",
                    content: "Сегодня утром мой 5-летний сын пролил сок по всему полу кухни. Он замер, посмотрел на меня и ушел в другую комнату. Я просто взяла липкую тряпку и вытерла пол. Позже той ночью, после того как он заснул, я сидела там, прокручивая это в голове...",
                    upvotes: 234,
                    comments: 12,
                    category: "История"
                  },
                  {
                    author: "u/MariaMom",
                    community: "м/СовместныеПокупки",
                    time: "5 ч. назад",
                    title: "Организую закупку детских книг от издательства 'Розовый жираф'",
                    content: "Привет! Организую совместную покупку детских книг. Скидка от 25% при заказе от 10 книг. Кто хочет присоединиться?",
                    upvotes: 89,
                    comments: 23,
                    category: "Покупки"
                  },
                  {
                    author: "u/ElenaK",
                    community: "м/Развитие",
                    time: "1 д. назад",
                    title: "Какие игрушки лучше всего развивают мелкую моторику у детей 2-3 лет?",
                    content: "Поделитесь опытом, пожалуйста! Ищу эффективные игрушки для развития мелкой моторики. Что работает у ваших малышей?",
                    upvotes: 156,
                    comments: 45,
                    category: "Вопрос"
                  }
                ].map((post, index) => (
                  <div key={index} className="bg-white rounded border border-gray-300 hover:border-gray-400 transition-colors">
                    <div className="flex">
                      {/* Vote buttons */}
                      <div className="w-10 bg-gray-50 flex flex-col items-center py-2">
                        <button className="p-1 hover:bg-purple-100 rounded">
                          <svg className="w-4 h-4 text-gray-400 hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-xs font-bold text-gray-700 my-1">{post.upvotes}</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Post content */}
                      <div className="flex-1 p-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                          <span className="font-medium">{post.community}</span>
                          <span>•</span>
                          <span>Опубликовано</span>
                          <span className="font-medium">{post.author}</span>
                          <span>{post.time}</span>
                          <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">{post.category}</span>
                        </div>

                        <h2 className="font-medium text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                          {post.title}
                        </h2>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                          {post.content}
                        </p>

                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments} комментариев</span>
                          </button>

                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span>Поделиться</span>
                          </button>

                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            <span>Сохранить</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ForumProvider>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-100 p-4">
          <div className="space-y-4">
            {/* Community Info */}
            <div className="bg-white rounded border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">О сообществе</h3>
              <p className="text-sm text-gray-700 mb-4">
                Добро пожаловать в МамПортал - место где родители делятся опытом, поддерживают друг друга и растут вместе.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Участников</span>
                  <span className="font-semibold">24.5k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Онлайн</span>
                  <span className="font-semibold text-green-600">•&nbsp;&nbsp;1.2k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Создано</span>
                  <span className="font-semibold">15 мар. 2020 г.</span>
                </div>
              </div>

              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-full font-medium mt-4 transition-colors">
                Создать пост
              </button>
            </div>

            {/* Rules */}
            <div className="bg-white rounded border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Правила сообщества</h3>
              <div className="space-y-2">
                {[
                  'Будьте добры и уважительны',
                  'Никакого спама или саморекламы',
                  'Проверяйте факты перед публикацией',
                  'Соблюдайте конфиденциальность детей',
                  'Никаких медицинских советов'
                ].map((rule, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-500 font-semibold">{index + 1}.</span>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderators */}
            <div className="bg-white rounded border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Модераторы</h3>
              <div className="space-y-2">
                {['u/OlgaModerator', 'u/KatyaAdmin', 'u/NadyaHelper'].map((mod, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{mod[2]}</span>
                    </div>
                    <span className="text-sm text-purple-600 hover:underline cursor-pointer">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;