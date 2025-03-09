# Personal Website with Dynamic Blog

A simple personal website with a dynamic blog that loads markdown files directly, designed for GitHub Pages.

## Project Structure

```
/
├── index.html           # Home page
├── blog.html            # Blog index page
├── _config.yml          # Jekyll configuration
├── site.json            # Site configuration
├── posts/               # Directory containing markdown blog posts
│   ├── manifest.json    # List of available blog posts
│   ├── first-post.md    # Sample blog post
│   ├── second-post.md   # Another sample blog post
│   └── third-post.md    # Yet another sample blog post
├── css/
│   └── style.css        # Main styles
├── js/
│   ├── main.js          # Main JavaScript
│   └── blog.js          # Blog functionality
└── blog/
    └── post.html        # Dynamic post template
```

## Features

- Clean, minimal design
- Responsive layout
- Dynamic blog with markdown support
- GitHub Pages compatible
- Simple navigation

## How It Works

The blog system uses a dynamic approach:

1. `posts/manifest.json` contains a list of all markdown files in the posts directory
2. `blog.js` loads each markdown file, extracts metadata from front matter, and displays a list of posts
3. When a user clicks on a post, they're taken to `blog/post.html?slug=post-slug`
4. The post template loads the corresponding markdown file, extracts content, and renders it as HTML

## How to Add a New Blog Post

1. Create a new markdown file in the `posts` directory (e.g., `my-new-post.md`)
2. Add front matter at the top of the file:

```yaml
---
layout: post
title: Your Post Title
date: YYYY-MM-DD
excerpt: A brief excerpt of the post.
---
```

3. Write your post content in markdown format below the front matter
4. Add the filename to `posts/manifest.json`:

```json
{
  "files": [
    "first-post.md",
    "second-post.md",
    "third-post.md",
    "my-new-post.md"  // Add your new post here
  ]
}
```

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to your repository settings
3. Under "GitHub Pages", select the main branch as the source
4. Your site will be published at `https://username.github.io/repository-name`
5. The system automatically handles the repository name in URLs

## Troubleshooting

If you encounter issues with loading blog posts:

1. Make sure all markdown files are listed in `posts/manifest.json`
2. Check that your markdown files have proper front matter with title, date, and excerpt
3. Verify that the repository name is correctly set in your GitHub Pages settings

## Customization

- Edit `site.json` to update site-wide settings
- Modify `_config.yml` to change Jekyll settings
- Update CSS files to change the appearance
- Modify HTML files to change the structure

## License

This project is open source and available under the [MIT License](LICENSE). 