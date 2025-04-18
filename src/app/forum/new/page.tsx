

'use client';

import ProtectedRoute from "@/components/Common/ProtectedRoute";
import NewTopicPage from "@/components/Forum/NewTopicPage";


export default function NewTopicPageRoute() {
  return (
    <ProtectedRoute fallbackRoute="/forum">
      <NewTopicPage />
    </ProtectedRoute>
  );
}