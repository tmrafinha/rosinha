export const SkeletonLoader = ({ className }: { className?: string }) => {
    return <div className={`animate-pulse bg-zinc-100 opacity-10 rounded-lg ${className}`}></div>;
};
