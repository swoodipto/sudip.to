# Personal Website with Dynamic Blog

A simple personal website with a dynamic blog that works seamlessly with GitHub Pages.

## Project Structure

```
/
├── index.html           # Home page
├── blog.html            # Blog index page
├── _config.yml          # Jekyll configuration
├── site.json            # Site configuration
├── build-manifest.js    # Script to generate manifest.json
├── package.json         # Node.js package configuration
├── posts/               # Directory containing markdown blog posts
│   ├── manifest.json    # Auto-generated list of posts with metadata
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
- Automated manifest generation

## How It Works

The blog system uses a dynamic approach that works with GitHub Pages:

1. You write blog posts as markdown files in the `posts` directory
2. The build script automatically generates `manifest.json` with post metadata and content
3. The blog loads posts from the manifest file
4. When a user clicks on a post, they're taken to `blog/post.html?slug=post-slug`
5. The post template loads the content and renders it as HTML

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
4. Run the build script to update the manifest:

```bash
npm run build-manifest
```

That's it! The script will automatically:
- Scan all markdown files in the posts directory
- Extract metadata and content from each file
- Generate the manifest.json file with all the necessary information

## GitHub Pages Compatibility

GitHub Pages doesn't serve raw markdown files directly, so this system:

1. Stores post content in the manifest.json file (automatically generated)
2. Includes fallback mechanisms if markdown files can't be loaded

This ensures your blog works both locally and when deployed to GitHub Pages.

## GitHub Pages Setup

1. Run `npm run build-manifest` to generate the latest manifest.json
2. Push your repository to GitHub
3. Go to your repository settings
4. Under "GitHub Pages", select the main branch as the source
5. Your site will be published at `https://username.github.io/repository-name`

## GitHub Actions (Optional)

You can set up GitHub Actions to automatically run the build script whenever you push changes:

1. Create a `.github/workflows/build.yml` file with:

```yaml
name: Build Manifest

on:
  push:
    branches: [ main ]
    paths:
      - 'posts/*.md'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm run build-manifest
      - name: Commit changes
        uses: EndBug/add-and-commit@v7
        with:
          message: 'Update manifest.json'
          add: 'posts/manifest.json'
```

This will automatically update the manifest whenever you add or modify a blog post.

## Troubleshooting

If you encounter issues with loading blog posts:

1. Make sure you've run `npm run build-manifest` after adding new posts
2. Check that your markdown files have proper front matter (title, date, excerpt)
3. Verify that the repository name is correctly detected in the URL

## Customization

- Edit `site.json` to update site-wide settings
- Modify `_config.yml` to change Jekyll settings
- Update CSS files to change the appearance
- Modify HTML files to change the structure

## License

This project is open source and available under the [MIT License](LICENSE). 