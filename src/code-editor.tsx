import React, { useRef, useCallback } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useEditable } from 'use-editable';
import lightTheme from 'prism-react-renderer/themes/github';
import parserTypeScript from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';

export const CodeEditor = ({
  value,
  onChange,
  className: rClassName,
}: {
  className: string;
  value: string;
  onChange: (c: string) => void;
}) => {
  const editorRef = useRef(null);

  const onEditableChange = useCallback((code: string) => {
    onChange(code.slice(0, -1));
  }, []);

  const doFormat = useCallback((code: string) => {
    onEditableChange(
      prettier.format(code, {
        parser: 'typescript',
        plugins: [parserTypeScript],
      })
    );
  }, []);

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <div className="relative">
      <button
        onClick={() => doFormat(value)}
        className="absolute border text-lg w-8 h-8 bg-gray-100 right-1 top-1 hover:bg-gray-200"
      >
        🧹
      </button>
      <Highlight
        {...defaultProps}
        theme={lightTheme}
        code={value}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className + ' ' + rClassName}
            style={style}
            ref={editorRef}
            spellCheck={false}
          >
            {tokens.map((line, i) => (
              <React.Fragment key={i}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                {'\n'}
              </React.Fragment>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
