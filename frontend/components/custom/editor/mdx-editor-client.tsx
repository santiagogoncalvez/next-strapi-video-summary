"use client";
// Note: this is build based on this library: https://mdxeditor.dev/editor/demo
import "@mdxeditor/editor/style.css";
import "./editor.css";
import { cn, getTranslation } from "@/lib/utils";

import { defaultSvgIcons, type IconKey } from "@mdxeditor/editor";

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
   thematicBreakPlugin,
   toolbarPlugin,
   MDXEditor,
   type MDXEditorMethods,
   type MDXEditorProps,
   ConditionalContents,
   Separator,
   ChangeCodeMirrorLanguage,
   UndoRedo,
   BoldItalicUnderlineToggles,
   markdownShortcutPlugin,
   ListsToggle,
   CreateLink,
   InsertTable,
   InsertThematicBreak,
   InsertCodeBlock,
   linkPlugin,
   imagePlugin,
   codeBlockPlugin,
   tablePlugin,
   linkDialogPlugin,
   codeMirrorPlugin,
   diffSourcePlugin,
   CodeToggle,
   BlockTypeSelect,
} from "@mdxeditor/editor";
import { basicLight } from "cm6-theme-basic-light";
import { useTheme } from "next-themes";
import type { ForwardedRef } from "react";
import esES from "./translations/es-es.json";

const lucideIcons: Partial<Record<IconKey, React.ReactElement>> = {
   undo: <Undo2 strokeWidth={1.5} />,
   redo: <Redo2 strokeWidth={1.5} />,
   format_bold: <Bold strokeWidth={1.5} />,
   format_italic: <Italic strokeWidth={1.5} />,
   format_underlined: <Underline strokeWidth={1.5} />,
   format_list_checked: <ListChecks strokeWidth={1.5} />,
   code: <Code2 strokeWidth={1.5} />,
   arrow_drop_down: <ChevronDownIcon strokeWidth={1.5} />,
   link: <Link strokeWidth={1.5} />,
   format_list_bulleted: <List strokeWidth={1.5} />,
   format_list_numbered: <ListOrdered strokeWidth={1.5} />,
   table: <Table strokeWidth={1.5} />,
   horizontal_rule: <Minus strokeWidth={1.5} />,
   frame_source: <SquareCode strokeWidth={1.5} />,
};

export default function MDXEditorClient({
   editorRef,
   ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
   const { resolvedTheme } = useTheme();
   const theme = [basicLight];
   return (
      <div className="rounded-2xl border-0 border-sidebar-border/50">
         <div
            className={cn("w-full markdown-editor relative", props.className)}
         >
            <MDXEditor
               key={resolvedTheme}
               contentEditableClassName="prose prose-neutral max-w-none relative px-0! py-4!"
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
                  linkPlugin(),
                  linkDialogPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                  tablePlugin(),
                  imagePlugin(),
                  codeBlockPlugin({
                     defaultCodeBlockLanguage: "txt",
                  }),

                  codeMirrorPlugin({
                     codeBlockLanguages: {
                        js: "JavaScript",
                        ts: "TypeScript",
                        html: "HTML",
                     },
                     autoLoadLanguageSupport: true,
                     codeMirrorExtensions: theme,
                  }),
                  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
                  toolbarPlugin({
                     toolbarContents: () => (
                        <ConditionalContents
                           options={[
                              {
                                 when: (editor) =>
                                    editor?.editorType === "codeblock",
                                 contents: () => <ChangeCodeMirrorLanguage />,
                              },
                              {
                                 fallback: () => (
                                    <>
                                       <UndoRedo />

                                       <Separator />
                                       <BoldItalicUnderlineToggles />
                                       <CodeToggle />

                                       <Separator />
                                       <BlockTypeSelect />

                                       <Separator />
                                       <CreateLink />

                                       <Separator />
                                       <ListsToggle />

                                       <Separator />
                                       <InsertTable />
                                       <InsertThematicBreak />

                                       <Separator />
                                       <InsertCodeBlock />
                                    </>
                                 ),
                              },
                           ]}
                        />
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
