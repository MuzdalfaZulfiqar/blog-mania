import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import BlogContext from "../Context/Blog/BlogContext";

function BlogDisplay(props) {
  const { id } = useParams();
  let context = useContext(BlogContext);
  let { blogs, getBlogById } = context;

  const editorRef = useRef(null);
  const editorInstance = useRef(null); // Ref to store the editor instance

  // Fetch the blog by id
  useEffect(() => {
    getBlogById(id);
  }, [id]);

  // Initialize and destroy Editor.js instance
  useEffect(() => {
    if (editorRef.current && blogs.content) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        data: blogs.content,
        readOnly: true,
        tools: {
          header: Header,
          list: List,
          code: Code,
          paragraph: Paragraph,
          image: {
            class: Image,
            inlineToolbar: true,
          },
          quote: Quote,
          delimiter: Delimiter,
          'inline-code': InlineCode,
          warning: Warning,
        },
      });

      // Cleanup function to destroy the editor instance
      return () => {
        if (editorInstance.current) {
          editorInstance.current.isReady.then(() => {
            editorInstance.current.destroy();
            editorInstance.current = null; // Reset the editor instance ref
          }).catch((error) => console.error('Editor.js cleanup error:', error));
        }
      };
    }
  }, [blogs.content]); // Re-run the effect when blogs.content changes

  return (
    <div>
      <div id="editorjs" ref={editorRef}></div>
    </div>
  );
}

export default BlogDisplay;
