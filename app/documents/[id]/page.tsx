import { DocumentType } from "@/types/Document";
import QuillBoard from "./_components/QuillBoard";

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
    <div className="container mx-auto flex flex-col h-full">
      {/* コンポーネントわけてSSRにする */}
      <p>{document.title}</p>

      <QuillBoard id={slug} />
    </div>
  );
}
