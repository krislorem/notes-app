import { useEffect, useRef } from 'react';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.css';

const Previewer = ({ value }) => {
  const editorRef = useRef(null);
  const cherryInstance = useRef(null);
  let CustomHookA = Cherry.createSyntaxHook('codeBlock', Cherry.constants.HOOKS_TYPE_LIST.PAR, {
    makeHtml(str) {
      console.warn('custom hook', 'hello');
      return str;
    },
    rule() {
      const regex = {
        begin: '',
        content: '',
        end: '',
      };
      regex.reg = new RegExp(regex.begin + regex.content + regex.end, 'g');
      return regex;
    },
  });
  useEffect(() => {
    if (!editorRef.current) return;

    cherryInstance.current = new Cherry({
      id: 'markdown-editor',
      value: value || '',
      externals: {
        katex: window.katex,
      },
      editor: {
        id: 'markdown-editor',
        name: 'markdown-editor',
        autoSave2Textarea: true,
        defaultModel: 'previewOnly',
        showFullWidthMark: true, // 是否高亮全角符号 ·|￥|、|：|“|”|【|】|（|）|《|》
        showSuggestList: true, // 是否显示联想框
      },
      engine: {
        global: {
          urlProcessor(url, srcType) {
            console.log(`url-processor`, url, srcType);
            return url;
          },
        },
        syntax: {
          image: {
            videoWrapper: (link, type, defaultWrapper) => {
              console.log(type);
              return defaultWrapper;
            },
          },
          autoLink: {
            /** 生成的<a>标签追加target属性的默认值 空：在<a>标签里不会追加target属性， _blank：在<a>标签里追加target="_blank"属性 */
            target: '',
            /** 生成的<a>标签追加rel属性的默认值 空：在<a>标签里不会追加rel属性， nofollow：在<a>标签里追加rel="nofollow：在"属性*/
            rel: '',
            /** 是否开启短链接 */
            enableShortLink: true,
            /** 短链接长度 */
            shortLinkLength: 20,
          },
          codeBlock: {
            theme: 'twilight',
            lineNumber: true, // 默认显示行号
            expandCode: true,
            copyCode: true,
            editCode: true,
            changeLang: true,
          },
          table: {
            enableChart: true,
          },
          fontEmphasis: {
            allowWhitespace: false, // 是否允许首尾空格
          },
          strikethrough: {
            needWhitespace: false, // 是否必须有前后空格
          },
          mathBlock: {
            engine: 'MathJax', // katex或MathJax
            src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax plugins，则需要使用该url通过script标签引入
          },
          inlineMath: {
            engine: 'MathJax', // katex或MathJax
          },
          emoji: {
            useUnicode: true,
            customResourceURL: 'https://github.githubassets.com/images/icons/emoji/unicode/${code}.png?v8',
            upperCase: false,
          },
        },
        customSyntax: {
          // SyntaxHookClass
          CustomHook: {
            syntaxClass: CustomHookA,
            force: false,
            after: 'br',
          },
        },
      },
      toolbars: {
        toc: {
          updateLocationHash: false, // 要不要更新URL的hash
          defaultModel: 'full', // pure: 精简模式/缩略模式，只有一排小点； full: 完整模式，会展示所有标题
        },
      },
      previewer: {
        // 自定义markdown预览区域class
        floatWhenClosePreviewer: false,
      },
      keydown: [],
      //extensions: [],
      // cherry初始化后是否检查 location.hash 尝试滚动到对应位置
      autoScrollByHashAfterInit: true,
      // locale: 'en_US',
      themeSettings: {
        mainTheme: 'light',
      },
      callback: {
        afterChange: (content) => {
          onChange(content);
        },
      },
    });

    return () => {
      if (cherryInstance.current) {
        cherryInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (cherryInstance.current && value !== cherryInstance.current.getValue()) {
      cherryInstance.current.setValue(value || '');
    }
  }, [value]);

  return (
    <div
      id="markdown-editor"
      ref={editorRef}
    />
  );
}

export default Previewer
