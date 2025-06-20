"use client";

import React, { useState } from "react";
import Button from "./Button";
import { BsClipboard2Fill, BsClipboard2CheckFill } from "react-icons/bs";

interface CopyButtonProps {
  textToCopy: string;
}

function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      // Reset the "copied" state after a short delay
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      className="absolute right-0 top-0 flex gap-2 items-center hover:bg-primary hover:border-primary rounded-none rounded-bl-lg"
      variant="outline"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <BsClipboard2CheckFill className="h-4 w-4 text-background" />
      ) : (
        <BsClipboard2Fill className="h-4 w-4 text-background" />
      )}
    </Button>
  );
}

export default CopyButton;
