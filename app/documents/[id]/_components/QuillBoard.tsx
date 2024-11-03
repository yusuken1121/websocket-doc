"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDebounce } from "use-debounce";

function QuillBoard() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 3000); // 3秒ごとに保存

  useEffect(() => {
    if (debouncedValue) {
      console.log("保存中...", debouncedValue);
      // APIリクエストやデータベースに保存する処理をここに追加
    }
  }, [debouncedValue]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="h-full"
    />
  );
}

export default QuillBoard;
