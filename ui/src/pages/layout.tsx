import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link> 
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
