import Head from "next/head";

import useSwr from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSwr("/api/hello", fetcher);

  if (error)
    return <div>Failed to get my vitals. Maybe the avatar is down.</div>;
  if (isLoading) return <div>Loading my vitals...</div>;
  if (!data) return null;
  console.log(data);
  return (
    <>
      <Head>
        <title>Tim's HUD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>My Heartbeat</h2>
        <h1>{data.data[0].bpm}</h1>
        <pre>{new Date(data.data[0].timestamp).toLocaleTimeString()}</pre>
        <p style={{
        
        }}>
          {JSON.stringify(data.data)}
        </p>
      </main>
    </>
  );
}
