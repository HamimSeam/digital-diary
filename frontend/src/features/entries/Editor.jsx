import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <p>Write your thoughts...</p>
    `,
  });

  return (
    <div className="flex flex-col w-6xl gap-4 min-h-[80vh] p-6 border border-gray-200 bg-white rounded-3xl shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
