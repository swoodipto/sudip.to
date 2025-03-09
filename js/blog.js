// Blog functionality
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {
        loadBlogPosts(postsContainer);
    }
});

// Load all blog posts for the index page
async function loadBlogPosts(postsContainer) {
    try {
        // Get the list of posts by fetching the manifest file
        const baseUrl = window.location.pathname.includes('/sudip.to/') ? '/sudip.to' : '';
        const manifestResponse = await fetch(`${baseUrl}/posts/manifest.json`);
        
        if (!manifestResponse.ok) {
            throw new Error('Failed to load posts manifest');
        }
        
        const manifest = await manifestResponse.json();
        const posts = [];
        
        // Load each post's metadata from its markdown file
        for (const filename of manifest.files) {
            if (filename.endsWith('.md')) {
                try {
                    const postResponse = await fetch(`${baseUrl}/posts/${filename}`);
                    if (postResponse.ok) {
                        const markdown = await postResponse.text();
                        const postData = extractPostData(markdown, filename);
                        if (postData) {
                            posts.push(postData);
                        }
                    }
                } catch (error) {
                    console.error(`Error loading post ${filename}:`, error);
                }
            }
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Load site configuration
        const siteConfig = await fetchSiteConfig(baseUrl);
        
        // Limit posts per page if specified in config
        const postsPerPage = siteConfig.blog?.postsPerPage || 10;
        const postsToShow = posts.slice(0, postsPerPage);
        
        if (postsToShow.length === 0) {
            postsContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }
        
        // Create HTML for each post
        const postsHTML = postsToShow.map(post => `
            <article class="post-card">
                <h2 class="post-title">${post.title}</h2>
                <div class="post-date">${formatDate(post.date)}</div>
                <p class="post-excerpt">${post.excerpt || ''}</p>
                <a href="${baseUrl}/blog/post.html?slug=${post.slug}" class="read-more">Read more</a>
            </article>
        `).join('');
        
        postsContainer.innerHTML = postsHTML;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
    }
}

// Extract post data from markdown content
function extractPostData(markdown, filename) {
    const frontMatterMatch = markdown.match(/^---\s*([\s\S]*?)\s*---/);
    if (!frontMatterMatch) return null;
    
    const frontMatter = frontMatterMatch[1];
    
    // Parse front matter
    const titleMatch = frontMatter.match(/title:\s*(.*)/);
    const dateMatch = frontMatter.match(/date:\s*(.*)/);
    const excerptMatch = frontMatter.match(/excerpt:\s*(.*)/);
    
    if (!titleMatch || !dateMatch) return null;
    
    return {
        title: titleMatch[1].trim(),
        date: dateMatch[1].trim(),
        excerpt: excerptMatch ? excerptMatch[1].trim() : '',
        slug: filename.replace('.md', '')
    };
}

// Load site configuration
async function fetchSiteConfig(baseUrl = '') {
    try {
        const response = await fetch(`${baseUrl}/site.json`);
        if (!response.ok) {
            throw new Error('Failed to load site configuration');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading site configuration:', error);
        return { 
            title: 'My Blog',
            description: 'My personal blog',
            blog: {
                postsPerPage: 10
            }
        };
    }
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