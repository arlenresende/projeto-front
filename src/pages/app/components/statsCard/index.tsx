import { ArrowUp, ShoppingCart } from 'lucide-react';

export default function StatsCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="p-4">
        <div className="flex">
          <div className="w-1/2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <ShoppingCart className="h-6 w-6 text-[#DD6E42]" />
            </div>
          </div>
          <div className="w-1/2 text-right">
            <p className="truncate text-sm text-gray-500">Total Orders</p>
            <h3 className="text-xl font-semibold text-gray-900">13,647</h3>
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-green-500">
              <ArrowUp className="inline h-3 w-3" /> 2.3%
            </span>
            <span className="ml-1 text-xs font-medium text-gray-500">Last Week</span>
          </div>
          <a href="#!" className="text-xs font-semibold text-[#DD6E42] hover:underline">
            View More
          </a>
        </div>
      </div>
    </div>
  );
}
