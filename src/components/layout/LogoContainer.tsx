import Link from 'next/link';

interface LogoContainerProps {
  children: React.ReactNode; // Define the type for children
}

const LogoContainer: React.FC<LogoContainerProps> = ({ children }) => {
    return <Link href="/" className="text-3xl font-bold py-2 logoContainer">{children}</Link>
};

export default LogoContainer;