import Head from "next/head";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useSwr from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSwr("/api/hello", fetcher);

  if (error)
    return <div>Failed to get my vitals. Maybe the avatar is down.</div>;
  if (isLoading) return <div>Loading my vitals...</div>;
  if (!data) return null;

  return (
    <>
      <Head>
        <title>Tim's HUD</title>
        <meta name="description" content="Real-life Avatar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>My Heartrate</h2>
        <LineChart
          width={620}
          height={240}
          data={data.data.map(datum => ({
            name: new Date(datum.timestamp),
            bpm: datum.bpm
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bpm" stroke="#8884d8"/>
        </LineChart>


        {/* <pre>{new Date(data.data[0].timestamp).toLocaleTimeString()}</pre> */}
        <p style={{}}>{JSON.stringify(data.data)}</p>
      </main>
    </>
  );
}
