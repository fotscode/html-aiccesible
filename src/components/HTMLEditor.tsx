import React from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

function HTMLEditor() {
    return <Editor 
        theme="vs-light"
        defaultLanguage="html" 
        defaultValue="// Copia tu código aquí" 
        options={{readOnly:false}}
    />;
};

export default HTMLEditor;
