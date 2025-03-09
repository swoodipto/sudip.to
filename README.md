# Personal Website with Jekyll Blog

A simple personal website with a blog that uses markdown files, designed for GitHub Pages.

## Project Structure

```
/
├── index.html           # Home page
├── blog.html            # Blog index page
├── _config.yml          # Jekyll configuration
├── site.json            # Site configuration
├── css/
│   └── style.css        # Main styles
├── js/
│   ├── main.js          # Main JavaScript
│   ├── blog.js          # Blog index functionality
│   └── post.js          # Single post functionality
├── blog/
│   └── post.html        # Single post template
└── posts/
    ├── first-post.md    # Sample post
    └── second-post.md   # Another sample post
```

## Features

- Clean, minimal design
- Responsive layout
- Blog with markdown support
- GitHub Pages compatible
- Simple navigation

## How to Add a New Blog Post

1. Create a new markdown file in the `posts` directory (e.g., `my-new-post.md`)
2. Add the front matter at the top of the file:

```yaml
---
layout: post
title: Your Post Title
date: YYYY-MM-DD
excerpt: A brief excerpt of the post.
---
```

3. Write your post content in markdown format below the front matter

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to your repository settings
3. Under "GitHub Pages", select the main branch as the source
4. Your site will be published at `https://username.github.io`

## Customization

- Edit `site.json` to update site-wide settings
- Modify `_config.yml` to change Jekyll settings
- Update CSS files to change the appearance
- Modify HTML files to change the structure

## License

This project is open source and available under the [MIT License](LICENSE). 