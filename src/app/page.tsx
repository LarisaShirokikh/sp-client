// src/app/pages/.tsx
"use client"
import type { NextPage } from 'next';
import CategoryNav from '../components/CategoryNav';
import FeaturedProducts from '../components/FeaturedProducts';
import PromoBanner from '../components/PromoBanner';
import RecentActivities from '../components/RecentActivities';
import UpcomingEvents from '../components/UpcomingEvents';
import TopicsList from '@/components/Forum/TopicsList';
import { ForumProvider } from './providers/ForumProvider';
import PopularTopics from '@/components/Forum/TopicsPreview';

const Home: NextPage = () => {

  return (
    <div className="min-h-screen">
      {/* <Header /> */}


      <main className="container mx-auto px-4 pb-6">
        <PromoBanner
          title="Весенняя коллекция детской одежды"
          description="Скидки до 40% на новую коллекцию"
          imageUrl="/api/placeholder/800/200"
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />

        {/* Форум */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mb-10">
          <ForumProvider>

            <div className="md:col-span-2">
              <PopularTopics />
            </div>
          </ForumProvider>
          <div>
            <RecentActivities />
          </div>
        </div>

        <div className="my-8">
          <CategoryNav />
        </div>


        <section className="mb-10">
          <FeaturedProducts />
        </section>

        <section className="mb-10">
          <PromoBanner
            title="Весенняя коллекция детской одежды"
            description="Скидки до 40% на новую коллекцию"
            imageUrl="/api/placeholder/800/200"
            bgColor="bg-purple-100"
            textColor="text-purple-800"
          />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            {/* <PopularTopics /> */}
          </div>
          <div>
            <RecentActivities />
          </div>
        </div>

        <section className="mb-10">
          <PromoBanner
            title="Присоединяйтесь к нашим онлайн-курсам"
            description="Развитие ребенка, восстановление после родов, психология материнства"
            imageUrl="/api/placeholder/800/200"
            bgColor="bg-green-100"
            textColor="text-green-800"
          />
        </section>

        <section className="mb-10">
          <UpcomingEvents />
        </section>
      </main>


    </div>
  );
};

export default Home;