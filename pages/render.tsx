import { doc, getDoc } from '@firebase/firestore';
import React from 'react';
import Tiptap from '../components/Editor';
import { adminDB } from '../utils/firebase-admin';

const Render = ({ content = '' }) => {
  return (
    <div>
      <Tiptap editable={false} content={content} />
    </div>
  );
};

export default Render;

export async function getStaticProps() {
  const snap = await adminDB.doc('demo/example').get();
  const article = snap.data();

  return {
    props: { content: article?.body }, // will be passed to the page component as props
  };
}
