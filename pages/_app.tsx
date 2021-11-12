import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github-dark-dimmed.min.css"
        />
      </Head>
      <nav className="flex space-x-4 p-4 border-b">
        <Link href="/">
          <a>投稿がめん</a>
        </Link>
        <Link href="/render">
          <a>表示がめん</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
