import React from "react";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta name="description" content="Page description" />
      </Head>
      <main>
        <h1>Welcome to the Page</h1>
        <p>This is a Next.js page boilerplate.</p>
      </main>
    </>
  );
};

export default Page;
