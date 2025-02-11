import Link from 'next/link';
import Image from "next/image";
import rocketImage from '@/assets/rocket.png'; 

export function Navigation() {
  return (
    <nav className="border-b px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold py-2"><Image src={rocketImage} alt="RocketLift" className="inline-block w-12 h-16 pr-4"/> RocketLift</Link>
        <div className="space-x-4 pr-20">
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <Link href="https://www.milangupta.io" className="hover:text-primary">About</Link>
        </div>
      </div>
    </nav>
  );
}