import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
   content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
   return (
      <article className="prose prose-neutral max-w-none">
         <ReactMarkdown>{content}</ReactMarkdown>
      </article>
   );
}
