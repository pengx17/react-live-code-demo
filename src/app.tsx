import '@arco-design/web-react/dist/css/arco.css';

import dependencies from './dependencies';
import { LiveCode } from './live-code';

import example from './example.txt?raw';

const customRequire = (key: string) => {
  const res = (dependencies as any)[key];

  if (res) {
    return res;
  }

  throw new Error('DEP: ' + key + ' not found');
  // we can inject spark-ui related here
};

export const App = () => {
  return <LiveCode defaultCode={example} require={customRequire} scope={{}} />;
};
