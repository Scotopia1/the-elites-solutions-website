'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from './TransitionProvider';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
  ...props
}) => {
  const router = useRouter();
  const { startTransition } = useTransition();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }

      // Start transition animation
      startTransition(() => {
        router.push(href);
      });
    },
    [href, router, startTransition, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
