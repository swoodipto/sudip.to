# My Personal Website

This is my personal website and blog built with Jekyll and hosted on GitHub Pages.

## Features

- Clean, responsive design
- Blog with support for markdown posts
- Custom CSS classes for markdown content
- SEO optimized

## Local Development

To run this site locally, you need to have Ruby and Jekyll installed. Then follow these steps:

1. Clone this repository
2. Install dependencies:
   ```
   bundle install
   ```
3. Start the Jekyll server:
   ```
   bundle exec jekyll serve
   ```
4. Open your browser and navigate to `http://localhost:4000`

## Adding Blog Posts

To add a new blog post:

1. Create a new markdown file in the `_posts` directory with the following naming convention:
   ```
   YYYY-MM-DD-title.md
   ```
2. Add the following front matter at the top of the file:
   ```yaml
   ---
   layout: post
   title: Your Post Title
   date: YYYY-MM-DD
   excerpt: A brief description of your post
   ---
   ```
3. Write your post content in markdown below the front matter

## Custom CSS Classes

You can use the following custom CSS classes in your markdown:

### Headings
```markdown
# Heading text {:.headerTest}
```

### Paragraphs
```markdown
This is a paragraph {:.centered}
```

### Images
```markdown
![Alt text](image-url "large-image")
```

### Captions
```markdown
This is a caption {:.caption}
```

## License

This project is open source and available under the [MIT License](LICENSE). 