"use client";
// Note: this is build based on this library: https://mdxeditor.dev/editor/demo
import "@mdxeditor/editor/style.css";
import "./editor.css";
import { cn, getTranslation } from "@/lib/utils";

import { BlockTypeSelect, defaultSvgIcons, type IconKey } from "@mdxeditor/editor";

import {
   Bold,
   ChevronDownIcon,
   Code2,
   Italic,
   Link,
   List,
   ListChecks,
   ListOrdered,
   Minus,
   Redo2,
   SquareCode,
   Table,
   Underline,
   Undo2,
} from "lucide-react";
import {
   headingsPlugin,
   listsPlugin,
   quotePlugin,
   toolbarPlugin,
   MDXEditor,
   type MDXEditorMethods,
   type MDXEditorProps,
   UndoRedo,
   BoldItalicUnderlineToggles,
   markdownShortcutPlugin,
   ListsToggle,
   CodeToggle,
} from "@mdxeditor/editor";
import { useTheme } from "next-themes";
import type { ForwardedRef } from "react";
import esES from "./translations/es-es.json";

const lucideIcons: Partial<Record<IconKey, React.ReactElement>> = {
   undo: <Undo2 strokeWidth={1.5} className="size-4" />,
   redo: <Redo2 strokeWidth={1.5} className="size-4" />,
   format_bold: <Bold strokeWidth={1.5} className="size-4" />,
   format_italic: <Italic strokeWidth={1.5} className="size-4" />,
   format_underlined: <Underline strokeWidth={1.5} className="size-4" />,
   format_list_checked: <ListChecks strokeWidth={1.5} className="size-4" />,
   code: <Code2 strokeWidth={1.5} className="size-4" />,
   arrow_drop_down: <ChevronDownIcon strokeWidth={1.5} className="size-4" />,
   link: <Link strokeWidth={1.5} className="size-4" />,
   format_list_bulleted: <List strokeWidth={1.5} className="size-4" />,
   format_list_numbered: <ListOrdered strokeWidth={1.5} className="size-4" />,
   table: <Table strokeWidth={1.5} className="size-4" />,
   horizontal_rule: <Minus strokeWidth={1.5} className="size-4" />,
   frame_source: <SquareCode strokeWidth={1.5} className="size-4" />,
};

export default function MDXEditorClient({
   editorRef,
   ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
   const { resolvedTheme } = useTheme();
   return (
      <div className="rounded-3xl border-0 border-sidebar-border/50">
         <div
            className={cn("w-full markdown-editor relative", props.className)}
         >
            <MDXEditor
               key={resolvedTheme}
               contentEditableClassName="prose! prose-neutral! dark:prose-invert! max-w-none relative px-0! py-4!"
               translation={(key, defaultValue, interpolations) =>
                  getTranslation(esES, key, defaultValue, interpolations)
               }
               iconComponentFor={(name) => {
                  // console.log("iconComponentFor:", name);
                  return lucideIcons[name] ?? defaultSvgIcons[name];
               }}
               plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  markdownShortcutPlugin(),
                  quotePlugin(),

                  toolbarPlugin({
                     toolbarContents: () => (
                        <>
                           <UndoRedo />
                           <BoldItalicUnderlineToggles />
                           <CodeToggle />
                           <ListsToggle />
                           <BlockTypeSelect />
                        </>
                     ),
                  }),
               ]}
               {...props}
               ref={editorRef}
            />
         </div>
      </div>
   );
}
