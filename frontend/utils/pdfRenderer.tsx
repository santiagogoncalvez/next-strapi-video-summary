import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Link,
   Image,
} from "@react-pdf/renderer";
import MarkdownIt from "markdown-it";
import type { Style } from "@react-pdf/types";

// Extrae el tipo exacto que devuelve la función parse
type Token = ReturnType<typeof md.parse>[number];

// Create markdown-it instance for parsing
const md = new MarkdownIt({
   html: false,
   linkify: true,
   typographer: true,
   breaks: true,
});

// PDF Styles
const styles = StyleSheet.create({
   page: {
      padding: 40,
      fontSize: 11,
      fontFamily: "Helvetica",
      lineHeight: 1.6,
      color: "#1e293b",
   },
   // Headings
   h1: {
      fontSize: 24,
      fontFamily: "Helvetica-Bold",
      marginTop: 0,
      marginBottom: 12,
      color: "#0f172a",
      borderBottomWidth: 2,
      borderBottomColor: "#e2e8f0",
      paddingBottom: 8,
   },
   h2: {
      fontSize: 20,
      fontFamily: "Helvetica-Bold",
      marginTop: 20,
      marginBottom: 10,
      color: "#0f172a",
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
      paddingBottom: 6,
   },
   h3: {
      fontSize: 16,
      fontFamily: "Helvetica-Bold",
      marginTop: 16,
      marginBottom: 8,
      color: "#0f172a",
   },
   h4: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      marginTop: 14,
      marginBottom: 6,
      color: "#0f172a",
   },
   h5: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      marginTop: 12,
      marginBottom: 6,
      color: "#0f172a",
   },
   h6: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      marginTop: 10,
      marginBottom: 4,
      color: "#475569",
   },
   // Paragraph
   paragraph: {
      marginBottom: 10,
      textAlign: "justify",
   },
   // Inline styles
   bold: {
      fontFamily: "Helvetica-Bold",
   },
   italic: {
      fontFamily: "Helvetica-Oblique",
   },
   boldItalic: {
      fontFamily: "Helvetica-BoldOblique",
   },
   strikethrough: {
      textDecoration: "line-through",
   },
   link: {
      color: "#3b82f6",
      textDecoration: "none",
   },
   // Code
   inlineCode: {
      fontFamily: "Courier",
      fontSize: 10,
      backgroundColor: "#f1f5f9",
      padding: "2 4",
      borderRadius: 2,
      color: "#d73a49",
   },
   codeBlock: {
      fontFamily: "Courier",
      fontSize: 9,
      backgroundColor: "#f6f8fa",
      padding: 12,
      marginVertical: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#e1e4e8",
   },
   codeText: {
      fontFamily: "Courier",
      fontSize: 9,
   },
   // Lists
   list: {
      marginVertical: 8,
      paddingLeft: 0,
   },
   listItem: {
      flexDirection: "row",
      marginBottom: 4,
   },
   listBullet: {
      width: 20,
      fontSize: 11,
   },
   listNumber: {
      width: 20,
      fontSize: 11,
   },
   listContent: {
      flex: 1,
   },
   // Blockquote
   blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: "#d0d7de",
      paddingLeft: 12,
      marginVertical: 10,
      color: "#64748b",
      fontFamily: "Helvetica-Oblique",
   },
   // Horizontal rule
   hr: {
      borderBottomWidth: 2,
      borderBottomColor: "#e2e8f0",
      marginVertical: 20,
   },
   // Table
   table: {
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#d0d7de",
   },
   tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#d0d7de",
   },
   tableHeaderRow: {
      flexDirection: "row",
      backgroundColor: "#f6f8fa",
      borderBottomWidth: 1,
      borderBottomColor: "#d0d7de",
   },
   tableCell: {
      flex: 1,
      padding: 6,
      borderRightWidth: 1,
      borderRightColor: "#d0d7de",
      fontSize: 10,
   },
   tableHeaderCell: {
      flex: 1,
      padding: 6,
      borderRightWidth: 1,
      borderRightColor: "#d0d7de",
      fontFamily: "Helvetica-Bold",
      fontSize: 10,
   },
   // Image
   image: {
      maxWidth: "100%",
      marginVertical: 10,
   },
   // Checkbox
   checkbox: {
      width: 10,
      height: 10,
      borderWidth: 1,
      borderColor: "#64748b",
      marginRight: 6,
   },
   checkboxChecked: {
      width: 10,
      height: 10,
      borderWidth: 1,
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
      marginRight: 6,
   },
});

// Helper to process inline tokens
const processInlineTokens = (
   tokens: Token[] | null,
   parentStyles: Style | Style[] = {},
) => {
   if (!tokens) return null;

   const elements = [];
   let keyIndex = 0;

   for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const key = `inline-${keyIndex++}`;

      switch (token.type) {
         case "text":
            elements.push(
               <Text key={key} style={parentStyles}>
                  {token.content}
               </Text>,
            );
            break;

         case "strong_open": {
            // Find the closing tag and process content
            const closeIdx = tokens.findIndex(
               (t, idx) => idx > i && t.type === "strong_close",
            );
            if (closeIdx > i) {
               const innerTokens = tokens.slice(i + 1, closeIdx);
               elements.push(
                  <Text key={key} style={[parentStyles, styles.bold]}>
                     {processInlineTokens(innerTokens, styles.bold)}
                  </Text>,
               );
               i = closeIdx;
            }
            break;
         }

         case "em_open": {
            const closeIdx = tokens.findIndex(
               (t, idx) => idx > i && t.type === "em_close",
            );
            if (closeIdx > i) {
               const innerTokens = tokens.slice(i + 1, closeIdx);
               elements.push(
                  <Text key={key} style={[parentStyles, styles.italic]}>
                     {processInlineTokens(innerTokens, styles.italic)}
                  </Text>,
               );
               i = closeIdx;
            }
            break;
         }

         case "s_open": {
            const closeIdx = tokens.findIndex(
               (t, idx) => idx > i && t.type === "s_close",
            );
            if (closeIdx > i) {
               const innerTokens = tokens.slice(i + 1, closeIdx);
               elements.push(
                  <Text key={key} style={[parentStyles, styles.strikethrough]}>
                     {processInlineTokens(innerTokens, styles.strikethrough)}
                  </Text>,
               );
               i = closeIdx;
            }
            break;
         }

         case "link_open": {
            // Convertimos explícitamente a String para garantizar tipo 'string'
            const rawHref = token.attrGet("href");
            const href = rawHref ? String(rawHref) : "";
            const closeIdx = tokens.findIndex(
               (t, idx) => idx > i && t.type === "link_close",
            );
            if (closeIdx > i) {
               const innerTokens = tokens.slice(i + 1, closeIdx);
               const linkText = innerTokens
                  .map((t) => t.content || "")
                  .join("");
               elements.push(
                  <Link key={key} src={href} style={styles.link}>
                     {linkText}
                  </Link>,
               );
               i = closeIdx;
            }
            break;
         }

         case "code_inline":
            elements.push(
               <Text key={key} style={styles.inlineCode}>
                  {token.content}
               </Text>,
            );
            break;

         case "softbreak":
            elements.push(<Text key={key}> </Text>);
            break;

         case "hardbreak":
            elements.push(<Text key={key}>{"\n"}</Text>);
            break;

         default:
            if (token.content) {
               elements.push(
                  <Text key={key} style={parentStyles}>
                     {token.content}
                  </Text>,
               );
            }
      }
   }

   return elements;
};

// Helper to render a single inline token group
const renderInline = (token: Token, key: string) => {
   if (!token.children) {
      return <Text key={key}>{token.content || ""}</Text>;
   }
   return processInlineTokens(token.children);
};

// Process block tokens to React PDF components
const processTokens = (tokens: Token[]) => {
   const elements = [];
   let keyIndex = 0;
   // let listCounter = 0

   for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const key = `block-${keyIndex++}`;

      switch (token.type) {
         case "heading_open": {
            const level = token.tag; // h1, h2, etc.
            const contentToken = tokens[i + 1];
            const styleKey = level.replace("h", "h") as keyof typeof styles; // h1 -> h1
            elements.push(
               <Text key={key} style={styles[styleKey] || styles.h1}>
                  {renderInline(contentToken, `${key}-content`)}
               </Text>,
            );
            i += 2; // Skip content and closing tag
            break;
         }

         case "paragraph_open": {
            const contentToken = tokens[i + 1];
            // Check if it's a task list item
            const content = contentToken?.content || "";
            if (
               content.startsWith("[ ]") ||
               content.startsWith("[x]") ||
               content.startsWith("[X]")
            ) {
               const isChecked =
                  content.startsWith("[x]") || content.startsWith("[X]");
               const text = content.slice(3).trim();
               elements.push(
                  <View key={key} style={styles.listItem}>
                     <View
                        style={
                           isChecked ? styles.checkboxChecked : styles.checkbox
                        }
                     />
                     <Text style={styles.listContent}>{text}</Text>
                  </View>,
               );
            } else {
               elements.push(
                  <Text key={key} style={styles.paragraph}>
                     {renderInline(contentToken, `${key}-content`)}
                  </Text>,
               );
            }
            i += 2;
            break;
         }

         case "bullet_list_open": {
            const listItems = [];
            let j = i + 1;
            while (
               j < tokens.length &&
               tokens[j].type !== "bullet_list_close"
            ) {
               if (tokens[j].type === "list_item_open") {
                  // Find paragraph content
                  let k = j + 1;
                  while (
                     k < tokens.length &&
                     tokens[k].type !== "list_item_close"
                  ) {
                     if (tokens[k].type === "paragraph_open") {
                        const contentToken = tokens[k + 1];
                        listItems.push(
                           <View
                              key={`li-${listItems.length}`}
                              style={styles.listItem}
                           >
                              <Text style={styles.listBullet}>•</Text>
                              <Text style={styles.listContent}>
                                 {renderInline(
                                    contentToken,
                                    `li-content-${listItems.length}`,
                                 )}
                              </Text>
                           </View>,
                        );
                        k += 2;
                     }
                     k++;
                  }
               }
               j++;
            }
            elements.push(
               <View key={key} style={styles.list}>
                  {listItems}
               </View>,
            );
            i = j;
            break;
         }

         case "ordered_list_open": {
            const listItems = [];
            let itemNum = 1;
            let j = i + 1;
            while (
               j < tokens.length &&
               tokens[j].type !== "ordered_list_close"
            ) {
               if (tokens[j].type === "list_item_open") {
                  let k = j + 1;
                  while (
                     k < tokens.length &&
                     tokens[k].type !== "list_item_close"
                  ) {
                     if (tokens[k].type === "paragraph_open") {
                        const contentToken = tokens[k + 1];
                        listItems.push(
                           <View
                              key={`li-${listItems.length}`}
                              style={styles.listItem}
                           >
                              <Text style={styles.listNumber}>{itemNum}.</Text>
                              <Text style={styles.listContent}>
                                 {renderInline(
                                    contentToken,
                                    `li-content-${listItems.length}`,
                                 )}
                              </Text>
                           </View>,
                        );
                        itemNum++;
                        k += 2;
                     }
                     k++;
                  }
               }
               j++;
            }
            elements.push(
               <View key={key} style={styles.list}>
                  {listItems}
               </View>,
            );
            i = j;
            break;
         }

         case "blockquote_open": {
            const quoteContent = [];
            let j = i + 1;
            while (j < tokens.length && tokens[j].type !== "blockquote_close") {
               if (tokens[j].type === "paragraph_open") {
                  const contentToken = tokens[j + 1];
                  quoteContent.push(
                     <Text key={`bq-${quoteContent.length}`}>
                        {renderInline(
                           contentToken,
                           `bq-content-${quoteContent.length}`,
                        )}
                     </Text>,
                  );
                  j += 2;
               }
               j++;
            }
            elements.push(
               <View key={key} style={styles.blockquote}>
                  {quoteContent}
               </View>,
            );
            i = j;
            break;
         }

         case "fence":
         case "code_block": {
            elements.push(
               <View key={key} style={styles.codeBlock}>
                  <Text style={styles.codeText}>{token.content}</Text>
               </View>,
            );
            break;
         }

         case "hr": {
            elements.push(<View key={key} style={styles.hr} />);
            break;
         }

         case "table_open": {
            const tableRows = [];
            let j = i + 1;
            let isHeader = false;

            while (j < tokens.length && tokens[j].type !== "table_close") {
               if (tokens[j].type === "thead_open") {
                  isHeader = true;
               } else if (tokens[j].type === "thead_close") {
                  isHeader = false;
               } else if (tokens[j].type === "tr_open") {
                  const cells = [];
                  let k = j + 1;
                  while (k < tokens.length && tokens[k].type !== "tr_close") {
                     if (
                        tokens[k].type === "th_open" ||
                        tokens[k].type === "td_open"
                     ) {
                        const contentToken = tokens[k + 1];
                        cells.push(
                           <Text
                              key={`cell-${cells.length}`}
                              style={
                                 isHeader
                                    ? styles.tableHeaderCell
                                    : styles.tableCell
                              }
                           >
                              {contentToken?.type === "inline"
                                 ? renderInline(
                                      contentToken,
                                      `cell-content-${cells.length}`,
                                   )
                                 : ""}
                           </Text>,
                        );
                        k += 2;
                     }
                     k++;
                  }
                  tableRows.push(
                     <View
                        key={`row-${tableRows.length}`}
                        style={
                           isHeader ? styles.tableHeaderRow : styles.tableRow
                        }
                     >
                        {cells}
                     </View>,
                  );
                  j = k;
               }
               j++;
            }
            elements.push(
               <View key={key} style={styles.table}>
                  {tableRows}
               </View>,
            );
            i = j;
            break;
         }

         case "image": {
            const src = token.attrGet("src");
            if (typeof src === "string" && src.length > 0) {
               elements.push(
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Image key={key} src={src} style={styles.image} />,
               );
            }
            break;
         }
      }
   }

   return elements;
};

interface MarkdownPDFDocumentProps {
   markdown: string;
}

// Main PDF Document component
export const MarkdownPDFDocument = ({ markdown }: MarkdownPDFDocumentProps) => {
   // Parse markdown to tokens
   const tokens = md.parse(markdown || "", {});
   const content = processTokens(tokens);

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {content.length > 0 ? (
               content
            ) : (
               <Text style={styles.paragraph}>No content to display</Text>
            )}
         </Page>
      </Document>
   );
};

export default MarkdownPDFDocument;
