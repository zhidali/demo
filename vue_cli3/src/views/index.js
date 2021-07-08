/*
 * @author: zhidl
 * @Date: 2021-07-08 09:45:08
 * @description: 
 * @LastEditTime: 2021-07-08 10:07:35
 * @LastEditors: zhidl
 */
import styleList from './style';

export default function highlightStyle() {
    return {
      viewerEffect({file}) {
        let hl = '';
        if(file.frontmatter && file.frontmatter.highlight) {
            hl = file.frontmatter.highlight;
        }
        const $style = document.createElement('style');
        $style.innerHTML = styleList['a11y-light'];
        document.head.appendChild($style);
        return () => {
            $style.remove();
        }
      }
    }
  }