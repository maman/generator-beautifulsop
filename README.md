![beautifulsop-screenshot](http://cl.ly/UaSO/Screen%20Shot%202014-03-23%20at%208.32.07%20PM.png)

BeautifulSOP is a Markdown to PDF converter. She process your markdown files into a PDF document, perfect for constructing a Standard Operation Procedure (SOP) documents. 

### Why BeautifulSOP?

Because PDF files, despite of it's standard document format, aren't indexable by [Git](http://git-scm.com/). and it makes the repository bigger. On the contrary, Markdown files is indexable, and smaller.

### Installation

Install the required tools globally by running:

```bash
npm install -g yo
```

Which will install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) automatically. Now, install BeautifulSOP generator using this command:

```bash
npm install -g generator-beautifulsop
```

### Usage

A complete workflow might look like this:

```bash
mkdir PROJECT_NAME
cd PROJECT_NAME
yo beautifulsop
git init
yo beautifulsop:doc "DOCUMENT_TITLE"
grunt work
grunt build
```

### Avalaible Generators

#### `yo beautifulsop:doc "DOCUMENT_TITLE"`

yeoman subgenerator to create a new Markdown template inside the `md/` directory. If you already running `grunt work`, the new markdown files will automatically detected and processed.

### Avalaible Tasks

Tasks can be run on parallel. For example, you can run `grunt build` in another window while running `grunt watch` on the another. 

#### `grunt work`

Grunt task to render markdowns into html for browser preview. The preview supports autoreload, so when you change the markdown/style file, the browser will reflect the change automatically.

After run this command, a browser window will appears. select the generated html from the list, and this will automatically reloads when you save the markdown file.

Note that page breaks will not visible on screen, but it will be visible on the resulting PDFs.

#### `grunt build`

Grunt task to build PDF files. the resulting PDF will be avalaible on `pdf` directory.

#### `grunt push`

If you enable FTP upload option, this Grunt task will be avalaible. the main functions is to upload generated PDF to a FTP sites.

### Caveats

1. Use `<div class="page-break"></div>` to create page breaks
2. Another helper classes are `.copyright-mark` and `.standard-title`
3. Edit styles by editing `src/scss/style.css` file.
4. Typography on BeautifulSOP is currently limited. You can use webfonts, but only locally and in the forms of `SVG`. 

### License

MIT
