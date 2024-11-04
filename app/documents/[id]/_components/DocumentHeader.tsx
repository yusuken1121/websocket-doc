"use client";
import { Button } from "@/components/ui/button";
import { Copy, Share } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DocumentType } from "@/types/Document";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DocumentHeader = ({ document }: { document: DocumentType | null }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard", {
        position: "top-center",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error("Failed to copy URL", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  if (!document) {
    return <div>Failed to load document</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl">{document.title}</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Share className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={url} readOnly />
            </div>
            <Button
              variant="default"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentHeader;
