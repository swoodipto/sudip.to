// Single post functionality
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on a single post page
    const postContent = document.getElementById('post-content');
    
    if (postContent) {
        // Get the post slug from the URL
        const slug = window.location.pathname.split('/').pop();
        
        if (slug) {
            loadSinglePost(slug);
        } else {
            postContent.innerHTML = '<p>Post not found.</p>';
        }
    }
});

// Load site configuration
async function fetchSiteConfig() {
    try {
        const response = await fetch('../site.json');
        if (!response.ok) {
            throw new Error('Failed to load site configuration');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading site configuration:', error);
        return { 
            title: 'My Blog',
            description: 'My personal blog'
        };
    }
}

// Load a single blog post
async function loadSinglePost(slug) {
    const postContent = document.getElementById('post-content');
    const postTitle = document.getElementById('post-title');
    const postDate = document.getElementById('post-date');
    
    try {
        // Load site configuration
        const siteConfig = await fetchSiteConfig();
        
        // Fetch posts from posts.json
        const indexResponse = await fetch('../posts.json');
        if (!indexResponse.ok) {
            throw new Error('Failed to load posts index');
        }
        
        const posts = await indexResponse.json();
        const post = posts.find(p => p.slug === slug);
        
        if (!post) {
            postContent.innerHTML = '<p>Post not found.</p>';
            return;
        }
        
        // Set post title and date
        if (postTitle) postTitle.textContent = post.title;
        if (postDate) postDate.textContent = formatDate(post.date);
        
        // Load the post content (markdown)
        const postResponse = await fetch(`../posts/${slug}.md`);
        if (!postResponse.ok) {
            throw new Error('Failed to load post content');
        }
        
        const markdown = await postResponse.text();
        
        // Extract content (remove front matter)
        const content = markdown.replace(/---[\s\S]*?---/, '').trim();
        
        // Convert markdown to HTML (simple implementation)
        const html = convertMarkdownToHTML(content);
        postContent.innerHTML = html;
        
        // Update page title
        document.title = `${post.title} | ${siteConfig.title || 'My Blog'}`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', post.excerpt || siteConfig.description);
        }
    } catch (error) {
        console.error('Error loading post:', error);
        postContent.innerHTML = '<p>Failed to load post. Please try again later.</p>';
    }
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Lists
    html = html.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Ordered lists
    html = html.replace(/^\s*\d+\.\s(.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Blockquotes
    html = html.replace(/^>\s(.*$)/gm, '<blockquote>$1</blockquote>');
    
    // Paragraphs (must be last)
    html = html.replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>');
    
    return html;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
} 