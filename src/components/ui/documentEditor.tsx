import React, { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const DocumentEditor: React.FC<EditorProps> = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="menu-bar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
          Bullet List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
          Ordered List
        </button>
        <button onClick={() => {
          const url = prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}>
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default DocumentEditor;