export interface Challenge {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    solution: string;
    hints: string[];
  }
  
  export const challengeData: Challenge[] = [
    {
      id: "basic-tags",
      title: "HTML Basic Tags",
      description: "HTML uses tags to structure content. Most tags have an opening and closing tag. Create a basic HTML page structure with a title that says 'My First Page'.",
      initialCode: "<!-- Write your code here -->",
      solution: `<!DOCTYPE html>
  <html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
  </body>
  </html>`,
      hints: [
        "HTML documents start with a DOCTYPE declaration: <!DOCTYPE html>",
        "The <html> tag contains everything, including <head> and <body> sections",
        "The page title goes in the <title> tag inside the <head> section"
      ]
    },
    {
      id: "elements",
      title: "HTML Elements",
      description: "HTML elements are defined by start tags, content, and end tags. Create a paragraph element with your favorite quote.",
      initialCode: "<!-- Create a paragraph element -->",
      solution: `<p>Your favorite quote goes here.</p>`,
      hints: [
        "Paragraphs in HTML use the <p> tag",
        "Don't forget to close your paragraph with </p>",
        "You can write any text between the opening and closing tags"
      ]
    },
    {
      id: "attributes",
      title: "HTML Attributes",
      description: "Attributes provide additional information about HTML elements. Create a link (anchor element) to 'https://www.example.com' with the text 'Visit Example' and open it in a new tab.",
      initialCode: "<!-- Create a link with attributes -->",
      solution: `<a href="https://www.example.com" target="_blank">Visit Example</a>`,
      hints: [
        "Links use the <a> tag with an href attribute for the URL",
        "To open a link in a new tab, use target=\"_blank\" attribute",
        "The text between the tags is what the user will click on"
      ]
    },
    {
      id: "headings",
      title: "HTML Headings",
      description: "HTML provides six levels of headings, from <h1> (most important) to <h6> (least important). Create three different heading levels with appropriate text.",
      initialCode: "<!-- Create three heading levels -->",
      solution: `<h1>Main Page Title</h1>
  <h2>Section Title</h2>
  <h3>Subsection Title</h3>`,
      hints: [
        "<h1> is used for the main title of a page",
        "<h2> is typically used for section titles",
        "Heading levels should be used in order (don't skip from h1 to h4)"
      ]
    },
    {
      id: "paragraphs",
      title: "HTML Paragraphs",
      description: "Paragraphs are defined with the <p> tag. Create two paragraphs with some text and separate them with a horizontal rule (<hr> tag).",
      initialCode: "<!-- Create two paragraphs with a horizontal rule between them -->",
      solution: `<p>This is the first paragraph with some text.</p>
  <hr>
  <p>This is the second paragraph with different text.</p>`,
      hints: [
        "Use <p> tags for each paragraph",
        "The <hr> tag creates a horizontal rule (line) between elements",
        "The <hr> tag is self-closing (no closing tag needed)"
      ]
    },
    {
      id: "formatting",
      title: "HTML Text Formatting",
      description: "HTML has several tags for formatting text. Create a paragraph that includes bold, italic, and underlined text.",
      initialCode: "<!-- Create a paragraph with formatted text -->",
      solution: `<p>This is <b>bold text</b>, this is <i>italic text</i>, and this is <u>underlined text</u>.</p>`,
      hints: [
        "Use <b> tags for bold text",
        "Use <i> tags for italic text",
        "Use <u> tags for underlined text"
      ]
    },
    {
      id: "comments",
      title: "HTML Comments",
      description: "Comments are used to insert notes in the HTML code. They are not displayed in the browser. Write some HTML with a multiline comment.",
      initialCode: "<!-- Write HTML code with a multiline comment -->",
      solution: `<!-- 
  This is a multiline comment
  It can span multiple lines
  And is not visible in the browser
  -->
  <p>This text is visible on the page.</p>`,
      hints: [
        "Comments start with <!-- and end with -->",
        "Comments can span multiple lines",
        "Anything inside a comment is not displayed on the webpage"
      ]
    },
    {
      id: "lists",
      title: "HTML Lists",
      description: "Create an unordered list with 3 items about your favorite foods.",
      initialCode: "<!-- Create an unordered list -->",
      solution: `<ul>
    <li>Pizza</li>
    <li>Sushi</li>
    <li>Ice Cream</li>
  </ul>`,
      hints: [
        "Unordered lists use the <ul> tag",
        "Each list item needs to be wrapped in <li> tags",
        "Don't forget to close each tag properly"
      ]
    },
    {
      id: "text-links",
      title: "HTML Text Links",
      description: "Create a text link to your favorite website with appropriate attributes.",
      initialCode: "<!-- Create a text link -->",
      solution: `<a href="https://www.example.com">Visit my favorite website</a>`,
      hints: [
        "Links use the <a> tag with an href attribute",
        "The URL goes inside the href attribute in quotes",
        "The text between the tags is what users will click on"
      ]
    },
    {
      id: "images",
      title: "HTML Images",
      description: "Insert an image with a source URL, alternative text, width and height attributes.",
      initialCode: "<!-- Insert an image with attributes -->",
      solution: `<img src="https://placekitten.com/200/300" alt="A cute kitten" width="200" height="300">`,
      hints: [
        "Images use the <img> tag with src attribute for the image URL",
        "Always include alt text to describe the image for accessibility",
        "The width and height attributes should specify dimensions in pixels"
      ]
    },
    {
      id: "tables",
      title: "HTML Tables",
      description: "Create a simple 2x2 table with data about different fruits.",
      initialCode: "<!-- Create a 2x2 table -->",
      solution: `<table border="1">
    <tr>
      <td>Apple</td>
      <td>Red</td>
    </tr>
    <tr>
      <td>Banana</td>
      <td>Yellow</td>
    </tr>
  </table>`,
      hints: [
        "Tables use the <table> tag as a container",
        "Each row uses a <tr> (table row) tag",
        "Each cell uses a <td> (table data) tag",
        "Adding border='1' to the table tag will make the borders visible"
      ]
    }
  ];
  