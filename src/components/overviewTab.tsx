"use client";
import ActivityList from './activityList';
import ProductList from './productList';

const OverviewTab = ({ recentActivity, popularProducts }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ActivityList activities={recentActivity} />
      <ProductList products={popularProducts} />
    </div>
  );
};

export default OverviewTab;