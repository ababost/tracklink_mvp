import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.svg" // This will load from public/logo.svg
      alt="TrackLink Logo"
      width={32}
      height={32}
      priority
    />
  );
}
