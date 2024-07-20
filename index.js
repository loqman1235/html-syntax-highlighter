const codeContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="html-syntax-highlighter.css" />
  </head>
  <body>
    <h1 class="heading" style="">Hello world</h1>
    <!-- this is a comment -->
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia doloremque molestias repudiandae voluptatibus corrupti autem dolores nemo atque ullam illum at, earum placeat natus quos, itaque deleniti illo qui non!</p>
    <!-- this is a comment -->
  </body>

  <script src="/script.js" defer='sdsd'></script>
</html>
`.trim();

const codeElement = document.getElementById("code");

const escapeHTML = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const syntaxHighlighter = (code) => {
  code = escapeHTML(code);

  console.log(code);

  const rules = {
    attributes: /(?<=\s)\w+(?=\=)|(?<=\s)\w+(?=&gt;)/g,
    strings:
      /(&quot;|&#039;)(?<=(&quot;|&#039;)).+(?=(&quot;|&#039;))(&quot;|&#039;)/g,
    tags: /&lt;\w+&gt;|&lt;\/\w+&gt;|&lt;\w+|(?<=)\s\/&gt;|&lt;!DOCTYPE|(?<!--)&gt;/g,
    comments: /&lt;!--(?<=&lt;!--).+(?=--&gt;)--&gt;/g,
  };

  for (const [key, rule] of Object.entries(rules)) {
    code = code.replace(rule, (match) => {
      return `<span class="highlight-${key}">${match}</span>`;
    });
  }

  return code;
};

codeElement.innerHTML = syntaxHighlighter(codeContent);
