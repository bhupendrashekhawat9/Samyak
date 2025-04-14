import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import CodeTool from "@editorjs/code";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Embed from "@editorjs/embed";
import { useTheme } from "@styles/Theme";


let useEditor = ({
    onChange,
    data
})=>{
    let editor = useRef<EditorJS|null>(null)
    useEffect(()=>{

        if(!editor.current){

        editor.current = new EditorJS({
            holder: "editorjs",
            autofocus: true,
            tools: {
              header:  Header,

              list: List,
              image: {
                class: Image,
                config: {
                  endpoints: {
                    byFile: "https://your-api.com/upload", // API endpoint to handle image uploads
                    byUrl: "https://your-api.com/fetchImage", // API endpoint to fetch images by URL
                  },
                },
              },
              table: Table,
              checklist: Checklist,
              code: CodeTool,
              quote: Quote,
              delimiter: Delimiter,
              marker: Marker,
              inlineCode: InlineCode,
              embed: Embed,
            },
            onChange: async (api) => {
                let data = await api.saver.save();
                
                onChange(data)
            },

            data:data
          })
        }

    },[])
      return editor
}
const Editor: React.FC<{onChange: (data: OutputData) => void, data: OutputData, onSave: (data: OutputData) => void}> = ({onChange, data}) => {


let handleOnChange = (data)=>{
    onChange(data)
    setContent(data)
}

  const editor = useEditor({onChange:handleOnChange,data});
  const [content, setContent] = useState<OutputData | null>(null);


  return (
    <div className="p-4 overflow-auto rounded h-full">
      {/* Editor.js Container */}
      <div id="editorjs" className="text-black" style={{
        // color:theme["text-color"]
      }}></div>

     
    </div>
  );
};

export default Editor;
