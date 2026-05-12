import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const AmenitySkeleton = ({ isRTL = false }) => {
  return (
    <Card className="border border-white/5 bg-[#0a0a0a]/60">
      <CardContent className="p-6">
        <div className={cn("flex items-start justify-between mb-4", isRTL && "flex-row-reverse")}>
          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            {/* Icon Skeleton */}
            <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
            
            {/* Text Skeletons */}
            <div className="space-y-2">
              <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
            </div>
          </div>

          {/* Menu Button Skeleton */}
          <div className="w-8 h-8 bg-white/5 rounded animate-pulse" />
        </div>

        {/* Metadata Skeletons */}
        <div className="space-y-2">
          <div className="h-4 w-40 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-36 bg-white/5 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitySkeleton;
