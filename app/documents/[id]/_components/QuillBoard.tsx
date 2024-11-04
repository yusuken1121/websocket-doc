"use client";

import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDebounce } from "use-debounce";

function QuillBoard({ id }: { id: string }) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 3000);

  // コンテンツの取得
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/documents/${id}`);
      if (!res.ok) throw new Error("Failed to fetch document content");
      const data = await res.json();
      setValue(data.document.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }, [id]);

  // コンテンツの保存
  const saveContent = useCallback(async () => {
    if (debouncedValue) {
      try {
        const res = await fetch(`/api/documents/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: debouncedValue }),
        });
        if (!res.ok) throw new Error("Failed to save document content");
        console.log("保存完了");
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  }, [debouncedValue, id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    saveContent();
  }, [debouncedValue, saveContent]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="h-full dark:text-accent dark:bg-black light:bg-white"
    />
  );
}

export default QuillBoard;
