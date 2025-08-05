'use client';

import { Skeleton } from "@heroui/react";

export default function SkeletonStepOne() {
  return (
    <div className="w-full py-6 space-y-4">
      <div className="text-2xl dark:text-slate-50 text-zinc-800">Información básica</div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
            <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
            <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
          <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
          <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
        </div>
      </div>
    </div>
  );
}
