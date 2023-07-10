"use client";

import { generateMarkdown } from "@/lib/markdown";
import { Editor } from "@monaco-editor/react";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { useEffect, useState, type ReactNode } from "react";
import Toolbar from "./Toolbar";

const inter = Inter({ subsets: ["latin"] });

export default function MarkdownEditor() {
  const [value, setValue] = useState("");
  const [renderedContent, setRenderedContent] = useState<ReactNode>(null);

  useEffect(() => {
    void generateMarkdown(value).then((file) => {
      setRenderedContent(file.result);
    });
  }, [value]);

  return (
    <div className="flex grow flex-row">
      <div className={clsx("flex w-1/2 flex-col border-r", inter.className)}>
        <Toolbar />
        <Editor
          language="markdown"
          loading={<></>}
          value={value}
          onChange={(v) => setValue(v ?? "")}
          options={{
            wordWrap: "on",
            padding: { top: 10 },
            minimap: { enabled: false },
            lineNumbers: "off",
            unicodeHighlight: { ambiguousCharacters: false },
          }}
        />
      </div>
      <div className="flex max-h-full w-1/2 flex-col overflow-scroll">
        <div className="h-0">
          <div className="flex flex-col gap-5 pt-5 @container">
            {renderedContent}
          </div>
        </div>
      </div>
    </div>
  );
}