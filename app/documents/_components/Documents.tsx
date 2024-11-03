"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, Share2Icon, UserIcon } from "lucide-react";
import { DocumentType } from "@/types/Document";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const createNewDocument = async () => {
    const newDoc = {
      title: "New Document",
      shared: false,
    };
    const res = await fetch("/api/documents", {
      method: "POST",
      body: JSON.stringify(newDoc),
    });
    const data = await res.json();
    setDocuments([...documents, data]);
  };
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/documents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error);
          return;
        }

        const data = await res.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("データの取得に失敗しました");
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1200px] mx-auto">
        <Button
          onClick={createNewDocument}
          className="mb-6 bg-black text-white hover:bg-gray-800"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Document
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card
              key={doc._id}
              className=" border-2 shadow-md hover:shadow-lg "
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {doc.title}
                </CardTitle>
                {doc.shared && <Share2Icon className="h-4 w-4" />}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm ">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {doc.activeUsers} active user{doc.activeUsers > 1 ? "s" : ""}
                </div>

                <Button
                  className="mt-4 w-full border-2 hover:bg-accent"
                  asChild
                >
                  <Link href={`/documents/${doc._id}`}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
