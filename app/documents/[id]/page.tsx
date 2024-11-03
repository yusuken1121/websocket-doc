import { DocumentType } from "@/types/Document";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  let document: DocumentType | null = null;

  try {
    const res = await fetch(`http://localhost:3000/api/documents/${slug}`);

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

  return <div>{document.title}</div>;
}
