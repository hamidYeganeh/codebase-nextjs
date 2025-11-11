'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { AvatarStyles } from './AvatarStyles';
import type { AvatarProps } from './AvatarTypes.d';

const getInitials = (name?: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
  return initials || name[0]?.toUpperCase() || '';
};

const Avatar: FC<AvatarProps> = (props) => {
  const { className, size, radius, color, ring, src, alt, name, ...otherProps } = props;
  const initials = getInitials(name);

  return (
    <div
      className={cn(className, AvatarStyles.base({ size, radius, color, ring }))}
      {...otherProps}
    >
      {src ? (
        <Image src={src} alt={alt ?? name ?? 'avatar'} fill sizes="48px" className="object-cover" />
      ) : (
        <span aria-hidden className="font-semibold">
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
