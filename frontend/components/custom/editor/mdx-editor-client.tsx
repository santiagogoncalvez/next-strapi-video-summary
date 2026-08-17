"use client";
// Note: this is build based on this library: https://mdxeditor.dev/editor/demo
import "@mdxeditor/editor/style.css";
import "./editor.css";
import { cn, getTranslation } from "@/lib/utils";

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
