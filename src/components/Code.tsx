import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import py from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CopyIcon, PasteIcon, SunIcon, MoonIcon } from "../assets/icons"
import '../styles/Code.css'

interface CodeProps {
  children: any,
  className: string,
  isDark: boolean,
  setIsDark: any,
}

const Code = (props: CodeProps) => {
  const [isCopied, setIsCopied] = useState(false)

  var language: string = "";
  if (props.className === undefined) {
    return <code>{props.children}</code>
  }
  else {
    language = props.className.replace("lang-", "")
  }

  SyntaxHighlighter.registerLanguage('jsx', jsx);
  SyntaxHighlighter.registerLanguage('py', py);
  SyntaxHighlighter.registerLanguage('yaml', yaml);
  SyntaxHighlighter.registerLanguage('diff', diff);

  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => { setIsCopied(false) }, 1000);
  }

  return (
    <div className="code">
      <div className="code__icons">
        <button onClick={() => props.setIsDark(!props.isDark)}>
          {props.isDark ? <MoonIcon /> : <SunIcon />}
        </button>

        <CopyToClipboard text={props.children}>
          <button onClick={() => setCopied()}>
            {isCopied
              ? <span title="Copied!"><PasteIcon /></span>
              : <span title="Copy to Clipboard"><CopyIcon /></span>
            }
          </button>
        </CopyToClipboard>
      </div>

      <SyntaxHighlighter language={language} style={props.isDark ? materialDark : materialLight}>
        {props.children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code