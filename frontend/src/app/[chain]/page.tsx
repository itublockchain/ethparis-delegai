"use client"
// pages/ChainPage.tsx
import { NextPage } from "next";
import { useEffect } from "react";
import { useQueryParams } from "../hooks";

const ChainPage = () => {
    const { query: path } = useQueryParams<{
        query: string;
      }>();

  return (
    <div className="text-9xl">
      {path === "gnosisdao" ? "Merhaba" : "Hoşçakal"}
    </div>
  );
};

export default ChainPage;
