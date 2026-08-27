import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import Prism from "prismjs";

// Import Prism language support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";

// Instanciamos primero markdown-it sin la opción highlight
const md = new MarkdownIt({
   html: true,
   linkify: true,
   typographer: true,
   breaks: true, // Convert single line breaks to <br>
});

// Asignamos la función highlight después para evitar la referencia circular 'md'
md.options.highlight = (str: string, lang: string): string => {
   if (lang && Prism.languages[lang]) {
      try {
         return (
            '<pre class="language-' +
            lang +
            '"><code class="language-' +
            lang +
            '">' +
            Prism.highlight(str, Prism.languages[lang], lang) +
            "</code></pre>"
         );
      } catch (err) {
         console.error("Syntax highlighting error:", err);
      }
   }
   // md.utils ya está correctamente instanciado
   return "<pre><code>" + md.utils.escapeHtml(str) + "</code></pre>";
};

export function renderMarkdownToHTML(markdown: string) {
   if (!markdown || markdown.trim() === "") {
      return '<p class="empty-state">Start typing to see your content here...</p>';
   }

   try {
      // Render markdown to HTML
      let html = md.render(markdown);

      // Add task list support manually if plugin not available
      html = html.replace(/\[ \]/g, '<input type="checkbox" disabled>');
      html = html.replace(
         /\[x\]/gi,
         '<input type="checkbox" checked disabled>',
      );

      // Sanitize HTML to prevent XSS
      const clean = DOMPurify.sanitize(html, {
         ALLOWED_TAGS: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "br",
            "hr",
            "strong",
            "em",
            "u",
            "s",
            "del",
            "a",
            "img",
            "ul",
            "ol",
            "li",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "pre",
            "code",
            "blockquote",
            "input",
            "span",
            "div",
         ],
         ALLOWED_ATTR: [
            "href",
            "src",
            "alt",
            "title",
            "class",
            "type",
            "checked",
            "disabled",
            "align",
            "style",
         ],
      });

      return clean;
   } catch (error) {
      console.error("Markdown parsing error:", error);
      const errorMessage =
         error instanceof Error ? error.message : "Unknown error";
      return (
         '<p style="color: red;">Error parsing markdown: ' +
         errorMessage +
         "</p>"
      );
   }
}
