import Link from 'next/link';
import { Drum, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-10 max-w-3xl mx-auto transform -translate-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-pink-600 mb-2">Присоединяйтесь к нашей рассылке</h3>
            <p className="text-gray-600 mb-4">Полезные советы, эксклюзивные акции и специальные предложения</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button className="bg-pink-600 text-white font-medium px-6 py-2 rounded-r-lg hover:bg-pink-700 transition-colors">
                Подписаться
              </button>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-2">
                <span className="text-pink-600 font-bold text-lg">М</span>
              </div>
              <h3 className="text-xl font-bold">МамаКлуб</h3>
            </div>
            <p className="text-white mb-4 opacity-90">
              Сообщество заботливых мам, которое поможет вам в самом важном путешествии вашей жизни.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-pink bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <Drum  size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-pink bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <Instagram size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-pink bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <Twitter size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-pink bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <Youtube size={18} className="text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Маркетплейс</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Детская одежда</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Игрушки</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Товары для мам</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Питание</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Распродажи</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Сообщество</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Форум</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Курсы</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Мероприятия</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Блоги</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Эксперты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Информация</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">О нас</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Контакты</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Доставка</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Оплата</Link></li>
              <li><Link href="#" className="text-white opacity-90 hover:opacity-100 hover:underline">Политика конфиденциальности</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center text-white opacity-80">
          <p>&copy; 2025 МамаКлуб. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;