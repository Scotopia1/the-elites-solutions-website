'use client';

import { Skeleton } from './skeleton';

export function WorkGallerySkeleton() {
  return (
    <div className="work-gallery-skeleton">
      <div className="container mx-auto px-4 py-16">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="work-item-skeleton">
              {/* Image Skeleton */}
              <Skeleton className="h-64 w-full rounded-lg mb-4" />

              {/* Title Skeleton */}
              <Skeleton className="h-6 w-3/4 mb-2" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Tags Skeleton */}
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkGallerySkeleton;
