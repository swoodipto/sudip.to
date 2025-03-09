# Personal Website with Dynamic Blog

A simple personal website with a dynamic blog that uses markdown content stored in JSON, designed for GitHub Pages.

## Project Structure

```
/
├── index.html           # Home page
├── blog.html            # Blog index page
├── _config.yml          # Jekyll configuration
├── site.json            # Site configuration
├── posts.json           # Blog posts metadata and content
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

1. `posts.json` contains metadata and content for all blog posts
2. `blog.js` loads this data and displays a list of posts on the blog page
3. When a user clicks on a post, they're taken to `blog/post.html?slug=post-slug`
4. The post template loads the corresponding post content from `posts.json` and renders it as HTML

## How to Add a New Blog Post

1. Write your post content in markdown format
2. Add the post metadata and content to `posts.json`:

```json
{
  "title": "Your Post Title",
  "slug": "my-new-post",
  "date": "YYYY-MM-DD",
  "excerpt": "A brief excerpt of the post.",
  "content": "# Your Post Title\n\nYour markdown content goes here..."
}
```

Note: Make sure to escape newlines with `\n` and other special characters in the JSON content.

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to your repository settings
3. Under "GitHub Pages", select the main branch as the source
4. Your site will be published at `https://username.github.io/repository-name`
5. Make sure to update the `baseurl` in `_config.yml` to match your repository name

## Customization

- Edit `site.json` to update site-wide settings
- Modify `_config.yml` to change Jekyll settings
- Update CSS files to change the appearance
- Modify HTML files to change the structure

## License

This project is open source and available under the [MIT License](LICENSE). 