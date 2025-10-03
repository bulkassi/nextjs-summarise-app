"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Summarize() {
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <Input
        value={url}
        onChange={(ev) => {
          setUrl(ev.target.value);
        }}
        className="w-6/10"
      />
      <Button className="w-30">Summarize</Button>
    </div>
  );
}
