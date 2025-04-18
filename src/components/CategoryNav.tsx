import Link from 'next/link';

interface CategoryItem {
  name: string;
  imageUrl: string;
  link: string;
  bgColor: string;
}

const CategoryNav: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      name: 'Детская одежда',
      imageUrl: 'https://jamper-kzn.ru/wp-content/uploads/2021/produkciya/detskaya-odezhda/glavnaya-mobil-deti.jpg',
      link: '/shop/clothes',
      bgColor: 'bg-pink-100'
    },
    {
      name: 'Игрушки',
      imageUrl: 'https://mchildren.ru/wp-content/uploads/2016/12/Malysh-s-igrshkami-1024x685.jpg',
      link: '/shop/toys',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Для новорожденных',
      imageUrl: 'https://img51994.kanal-o.ru/img/2019-12-23/fmt_81_24_shutterstock_1005876871.jpg',
      link: '/shop/newborn',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Развитие',
      imageUrl: 'https://cdn2.pravdasevera.ru/610be47ef5985cebff524d92/610be49381af6.jpg',
      link: '/shop/development',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Красота для мам',
      imageUrl: 'https://img.joomcdn.net/bc5ea9fc72b5eeafe68dc5aaf7267a45c4df9d68_original.jpeg',
      link: '/shop/beauty',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Питание',
      imageUrl: 'https://st29.styapokupayu.ru/images/blog_posts/covers/000/326/840_large.png?1695639518',
      link: '/shop/food',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Мероприятия',
      imageUrl: 'https://yaminiya.ru/image/cache/catalog/image/data/Xalat/6u-96jwpdr0-1000x1000.jpg',
      link: '/events',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Все категории',
      imageUrl: 'https://cottonbaby.ru/images/pictures/hero/IMG_4971.JPG',
      link: '/shop',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Популярные категории</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link href={category.link} key={index} className="flex flex-col items-center group">
            <div className={`w-40 h-40 rounded-lg overflow-hidden ${category.bgColor} mb-2 transition-transform group-hover:scale-105`}>
              <img 
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-center text-gray-600 group-hover:text-pink-600 transition-colors">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;