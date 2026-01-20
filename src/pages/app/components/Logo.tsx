import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  url: string;
  className?: string;
}

export default function Logo({ className, url }: LogoProps) {
  return (
    <div className="flex flex-col  ">
      <a href={url} className="w-full flex items-center gap-2 font-semibold justify-center">
        <h2
          className={`text-white text-2xl font-bold md:text-3xl flex items-center justify-center gap-1 ${className}`}
        >
          Cataloguei
          <ShoppingBag size={32} color="#fff" />
        </h2>
      </a>
    </div>
  );
}
