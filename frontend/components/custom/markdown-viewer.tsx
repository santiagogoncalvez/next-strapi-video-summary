import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
   content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
   return (
      <article className="prose prose-neutral dark:prose-invert max-w-none">
         <ReactMarkdown>{content}</ReactMarkdown>
      </article>
   );
}
