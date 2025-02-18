import Link from 'next/link';
import { getFooterNavigation } from '@/lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerNavigation = getFooterNavigation();

  const getSectionLink = (title: string): string => {
    switch (title) {
      case 'Blog':
        return '/blog';
      case 'Tools':
        return '/tools';
      default:
        return '';
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerNavigation.map((section) => (
            <div key={section.title} className="space-y-4">
              {getSectionLink(section.title) ? (
                <Link 
                  href={getSectionLink(section.title)}
                  className="inline-block"
                >
                  <h3 className="text-lg font-semibold text-white hover:text-gray-100 transition-colors duration-200">
                    {section.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              © {currentYear} RocketLift Digital. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}