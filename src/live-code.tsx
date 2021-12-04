import React from 'react';
import { transform } from './transform';
import { evalCode } from './eval-code';
import { ErrorBoundary } from './error-boundary';
import { CodeEditor } from './code-editor';

function toEl(el: any) {
  if (typeof el === 'function') {
    return React.createElement(el);
  }
  return el ?? null;
}

export function LiveCode({
  defaultCode,
  scope,
  require,
}: {
  defaultCode: string;
  scope: Record<string, any>;
  require: (key: string) => any;
}) {
  const [code, setCode] = React.useState(defaultCode);
  const transformed = React.useMemo(() => transform(code), [code]);
  const res = React.useMemo(
    () => evalCode(transformed, { ...scope, require }),
    [transformed]
  );

  const [showTransformed, setShowTransformed] = React.useState(false);

  return (
    <div className="p-2 w-screen max-w-256">
      <div className="text-xs border border-2 font-mono">
        <CodeEditor
          className="w-full border-b bg-gray-100 p-2 min-h-64"
          value={code}
          onChange={(v) => setCode(v)}
        />
        <pre
          onClick={() => {
            setShowTransformed((s) => !s);
          }}
          className={
            'w-full whitespace-pre-wrap p-2 bg-blue-50 overflow-hidden' +
            (showTransformed
              ? ''
              : ' max-h-2 opacity-50 cursor-pointer hover:bg-gray-200')
          }
        >
          {transformed.message ? transformed.message : transformed}
        </pre>
      </div>

      <hr className="m-2" />
      <div className="text-xl mb-2 font-bold">Preview</div>
      <div className="text-xs border border-2 p-4">
        <ErrorBoundary>
          {res?.error ? res.error?.message : toEl(res)}
        </ErrorBoundary>
      </div>
    </div>
  );
}
