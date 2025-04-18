"use client"

import FilterBar from "@/components/Forum/FilterBar";
import TopicsList from "@/components/Forum/TopicsList";


export default function ForumPage() {
  return (
    <>
      <FilterBar />
      <TopicsList />
    </>
  );
}