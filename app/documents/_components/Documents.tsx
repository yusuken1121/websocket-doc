"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, Share2Icon, UserIcon } from "lucide-react";

type Document = {
  id: string;
  title: string;
  shared: boolean;
  activeUsers: number;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", title: "Project Ideas", shared: false, activeUsers: 1 },
    { id: "2", title: "Meeting Notes", shared: true, activeUsers: 3 },
    { id: "3", title: "Personal Journal", shared: false, activeUsers: 1 },
  ]);

  const createNewDocument = () => {
    const newDoc = {
      id: String(documents.length + 1),
      title: `New Document ${documents.length + 1}`,
      shared: false,
      activeUsers: 1,
    };
    setDocuments([...documents, newDoc]);
  };

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
            <Card key={doc.id} className=" border-2 shadow-md hover:shadow-lg ">
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
                <Link href={`/documents/${doc.id}`}>
                  <Button className="mt-4 w-full border-2 hover:bg-accent">
                    Open
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
