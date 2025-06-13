import React from "react";

function EditorToolbar({ editor }) {
  return (
    <div className="flex gap-2 p-2 border-b bg-white shadow-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "italic text-blue-600" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline") ? "underline text-blue-600" : ""
        }
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "text-blue-600" : ""}
      >
        • List
      </button>
    </div>
  );
}

export default EditorToolbar;
