'use client';

import { Skeleton } from "@heroui/react";

export default function SkeletonStepTwo() {
  return (
    <div className="w-full py-6 space-y-4">
      <div className="text-2xl dark:text-slate-50 text-zinc-800">Características principales</div>

      <div className="flex flex-col gap-4">
        {/* Select tipo */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/4 bg-default-200 rounded-md" />
          <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
        </div>

        {/* Grid de inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dormitorios */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
            <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
          </div>

          {/* Baños */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-1/3 bg-default-200 rounded-md" />
            <Skeleton className="h-10 w-full bg-default-300 rounded-md" />
          </div>
        </div>

        {/* Características (checkboxes múltiples) */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/4 bg-default-200 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[...Array(6)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full bg-default-300 rounded-md" />
            ))}
          </div>
        </div>

        {/* Servicios (checkboxes múltiples) */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/4 bg-default-200 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[...Array(6)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full bg-default-300 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
