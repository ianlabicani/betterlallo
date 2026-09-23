import type { ImgHTMLAttributes } from 'react';

type BrandLogoProps = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'alt' | 'className' | 'height' | 'width'
>;

const BrandLogo = ({
  alt = 'BetterLal-lo logo',
  className,
  height = 512,
  width = 512,
}: BrandLogoProps) => (
  <img
    src="/better-lallo-logo.png"
    alt={alt}
    className={className}
    width={width}
    height={height}
    decoding="async"
  />
);

export default BrandLogo;
