'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Bills',
    href: '/dashboard/bills',
    icon: CurrencyEuroIcon,
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] basis-0 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <div className="flex md:hidden flex-col items-center">
              <LinkIcon className="w-6" />
              <span className="text-xs font-light">{link.name}</span>
            </div>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
