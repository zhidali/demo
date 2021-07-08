/*
 * @author: zhidl
 * @Date: 2021-07-08 10:00:24
 * @description: 
 * @LastEditTime: 2021-07-08 16:32:32
 * @LastEditors: zhidl
 */
export default {
    
    'a11y-light': `
    
    .hljs-comment,
    .hljs-quote {
      color: #d4d0ab;
    }
    
    /* Red */
    .hljs-variable,
    .hljs-template-variable,
    .hljs-tag,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-regexp,
    .hljs-deletion {
      color: #ffa07a;
    }
    
    /* Orange */
    .hljs-number,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params,
    .hljs-meta,
    .hljs-link {
      color: #f5ab35;
    }
    
    /* Yellow */
    .hljs-attribute {
      color: #ffd700;
    }
    
    /* Green */
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-addition {
      color: #abe338;
    }
    
    /* Blue */
    .hljs-title,
    .hljs-section {
      color: #00e0e0;
    }
    
    /* Purple */
    .hljs-keyword,
    .hljs-selector-tag {
      color: #dcc6e0;
    }
    
    .hljs {
      display: block;
      overflow-x: auto;
      background: #2b2b2b;
      color: #f8f8f2;
      padding: 0.5em;
    }
    
    .hljs-emphasis {
      font-style: italic;
    }
    
    .hljs-strong {
      font-weight: bold;
    }
    
    @media screen and (-ms-high-contrast: active) {
      .hljs-addition,
      .hljs-attribute,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-bullet,
      .hljs-comment,
      .hljs-link,
      .hljs-literal,
      .hljs-meta,
      .hljs-number,
      .hljs-params,
      .hljs-string,
      .hljs-symbol,
      .hljs-type,
      .hljs-quote {
            color: highlight;
        }
    
        .hljs-keyword,
        .hljs-selector-tag {
            font-weight: bold;
        }
    }`
}