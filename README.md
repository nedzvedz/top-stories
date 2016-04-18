For using babel run:  
`npm install`   
`npm run build`

Latest changes:   
- Rename 'main.js' into 'topStories.js'   
- Add code transpiling from ES2015 to ES5 with Babel
- Add 'polyfill.min.js' to use Iterators (like for..of)   
- Add 'fetch' polyfill and 'es6-promise' to use fetch method in IE browsers   
- Replace elem.dataset with elem.getAttribute to support IE10  
- Replace using of proxy since Babel can not transpile them due to ES5 limitations
