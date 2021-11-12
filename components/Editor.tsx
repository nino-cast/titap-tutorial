import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { FormEvent } from 'react';
import { db, storage } from '../utils/firebase';
import { doc, setDoc } from '@firebase/firestore';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';

const Tiptap = ({ editable = true, content = '<p>Hello World! 🌎️</p>' }) => {
  const classNames = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-h-40 rounded',
        },
      }),
    ],
    content,
    editorProps: {
      editable: () => editable,
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const uploadImage = async (event: FormEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files?.[0];

    const imageRef = ref(storage, `demo/${Date.now()}`);
    await uploadBytes(imageRef, image as Blob);
    const src = await getDownloadURL(imageRef);
    editor?.chain().focus().setImage({ src }).run();

    event.currentTarget.value = '';
  };

  const submit = () => {
    setDoc(doc(db, 'demo/example'), {
      body: editor?.getJSON(),
    }).then(() => {
      alert('投稿完了');
    });
  };

  return (
    <div>
      {editable && (
        <div className="flex text-2xl items-center">
          <button
            className={classNames(
              'p-4',
              editor?.isActive('bold') && 'font-bold'
            )}
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
            }}
          >
            <i className="ri-bold"></i>
          </button>
          <button
            className={classNames(
              'p-4',
              editor?.isActive('bulletList') && 'font-bold'
            )}
            onClick={() => {
              editor?.chain().focus().toggleBulletList().run();
            }}
          >
            <i className="ri-list-unordered"></i>
          </button>
          <label className="p-4 block">
            <i className="ri-image-line"></i>
            <input className="hidden" type="file" onChange={uploadImage} />
          </label>
        </div>
      )}
      <EditorContent editor={editor} />
      {editable && <button onClick={submit}>投稿</button>}
    </div>
  );
};

export default Tiptap;
