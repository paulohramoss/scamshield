import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonResult() {
  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* Main card skeleton */}
      <Card className="border-2 border-gray-100">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full shrink-0" />
            <div className="flex-1 space-y-3 w-full">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-28 rounded-full" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score bar skeleton */}
      <Card>
        <CardContent className="pt-5 space-y-2">
          <Skeleton className="h-3 rounded-full" />
          <div className="flex justify-between">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-12" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Red flags skeleton */}
      <Card>
        <CardContent className="pt-5 space-y-3">
          <Skeleton className="h-5 w-40" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions skeleton */}
      <Card>
        <CardContent className="pt-5 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons skeleton */}
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
