import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {

    };

    if (router.isReady) {
      getData();
    }

  }, [router.isReady]);

  return (
    <>
    <h1>Template</h1>
    </>
  );
}