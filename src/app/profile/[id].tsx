import React from "react";
import Head from "next/head";
import { auth } from "~/server/auth";

export async function Profile() {
  const session = await auth();

  return (
    <>
      <Head>
        <title>{session?.user?.name} - BingeCringe</title>
      </Head>
      <main>
        <h1>{session?.user?.name}</h1>
        <p>{session?.user?.id}:</p>
      </main>
    </>
  );
}

export default Profile;
