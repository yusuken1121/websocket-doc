import { DocumentType } from "@/types/Document";
import QuillBoard from "./_components/QuillBoard";
import { BreadcrumbDocument } from "./_components/Breadcrumb";
import DocumentHeader from "./_components/DocumentHeader";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  let document: DocumentType | null = null;

  try {
    const res = await fetch(`http://localhost:3000/api/documents/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch document");
    }

    const data = await res.json();
    document = data.document as DocumentType;
  } catch (error) {
    console.log(error);
  }

  if (!document) {
    return <div>Failed to load document</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 h-full">
      {/* コンポーネントわけてSSRにする */}
      <BreadcrumbDocument id={slug} />
      <DocumentHeader document={document} />
      <QuillBoard id={slug} />
    </div>
  );
}
