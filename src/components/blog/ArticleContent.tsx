"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 prose prose-invert prose-lg prose-gold">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom paragraph styling
          p: ({ children }) => (
            <p className="text-neutral-300 leading-relaxed mb-6">
              {children}
            </p>
          ),

          // Custom heading styling
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-white mt-16 mb-8">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-2xl font-bold text-white mt-8 mb-4">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="text-xl font-bold text-white mt-6 mb-3">
              {children}
            </h4>
          ),

          // Custom code block styling
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-xl my-6"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="px-2 py-1 bg-neutral-800 border border-gold-400/20 rounded text-gold-400 text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Custom blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold-400 pl-6 my-8 italic text-neutral-400">
              {children}
            </blockquote>
          ),

          // Custom link styling
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-gold-400 hover:text-gold-300 underline decoration-gold-400/30 hover:decoration-gold-400 transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),

          // Custom list styling
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="text-neutral-300">
              {children}
            </li>
          ),

          // Custom strong/bold styling
          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),

          // Custom emphasis/italic styling
          em: ({ children }) => (
            <em className="italic text-neutral-200">
              {children}
            </em>
          ),

          // Custom horizontal rule styling
          hr: () => (
            <hr className="border-t border-neutral-700 my-8" />
          ),

          // Custom table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-neutral-700">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-neutral-800">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody className="bg-neutral-900 divide-y divide-neutral-700">
              {children}
            </tbody>
          ),

          tr: ({ children }) => (
            <tr className="hover:bg-neutral-800 transition-colors">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
