import Link from 'next/link';
import Image from "next/image";
import rocketImage from '@/assets/rocket.png'; 
import LogoContainer from '@/components/layout/LogoContainer';
import { ContactButton } from '@/components/contact/ContactButton';


export function Navigation() {
  return (
    <nav className="border-b px-4">
      <div className="navbar container mx-auto flex items-center justify-between">
        <LogoContainer>
          <Image src={rocketImage} alt="RocketLift" className="logo-image inline-block w-12 h-16 pr-4"/> 
          <div>RocketLift</div>
        </LogoContainer>
        <div className="flex items-center space-x-4 pr-20 py-2">
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <Link href="https://www.milangupta.io" className="hover:text-primary">About</Link>
          <ContactButton variant="navbar" />
        </div>
      </div>
    </nav>
  );
}

