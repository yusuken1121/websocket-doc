import { DocumentType } from "@/types/Document";
import QuillBoard from "./_components/QuillBoard";
import { BreadcrumbDocument } from "./_components/Breadcrumb";

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
    document = data.document;
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
      <h1 className="text-xl">{document.title}</h1>

      <QuillBoard id={slug} />
    </div>
  );
}
