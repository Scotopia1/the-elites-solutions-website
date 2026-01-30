"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <motion.article
      className="max-w-3xl mx-auto px-6 py-12 prose prose-invert prose-lg prose-gold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom paragraph styling
          p: ({ children }) => (
            <motion.p
              className="text-neutral-300 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.p>
          ),

          // Custom heading styling
          h2: ({ children }) => (
            <motion.h2
              className="text-3xl font-bold text-white mt-12 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.h2>
          ),

          h3: ({ children }) => (
            <motion.h3
              className="text-2xl font-bold text-white mt-8 mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.h3>
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
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.article>
  );
}
