"use client";

import { useState } from "react";
import { BsClipboard2CheckFill, BsClipboard2Fill } from "react-icons/bs";
import Button from "./Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface CopyButtonProps {
  textToCopy: string;
}

function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let copySuccessful = false;

    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copySuccessful = true;
      } catch (err) {
        console.warn("Clipboard API failed, trying fallback method:", err);
      }
    }

    // Fallback method if modern API failed or isn't available
    if (!copySuccessful) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("execCommand failed");
        }
        copySuccessful = true;
      } catch (err) {
        console.error("Both clipboard methods failed:", err);
      }
    }

    // Show feedback regardless of success/failure
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      className="absolute right-0 top-0 flex gap-2 items-center hover:bg-transparent py-2 border-0 rounded-none h-10"
      variant="outline"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <BsClipboard2CheckFill className="h-4 w-4 text-primary" />
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <BsClipboard2Fill className="h-4 w-4 text-foreground hover:text-primary" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to Clipboard</p>
          </TooltipContent>
        </Tooltip>
      )}
    </Button>
  );
}

export default CopyButton;
