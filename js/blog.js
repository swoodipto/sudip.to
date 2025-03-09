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
        // Determine base URL for GitHub Pages
        const baseUrl = getBaseUrl();
        
        // Get the list of posts by fetching the manifest file
        const manifestResponse = await fetch(`${baseUrl}/posts/manifest.json`);
        
        if (!manifestResponse.ok) {
            throw new Error('Failed to load posts manifest');
        }
        
        const manifest = await manifestResponse.json();
        const posts = [];
        
        // For GitHub Pages, we'll use the metadata from manifest directly
        // since raw markdown files might not be served correctly
        if (manifest.posts && Array.isArray(manifest.posts)) {
            // Use the posts array directly if available in manifest
            posts.push(...manifest.posts);
        } else {
            // Try to load each post's metadata from its markdown file
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
                        } else {
                            // If markdown file can't be loaded, create a post entry from the filename
                            const slug = filename.replace('.md', '');
                            const title = slug.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ');
                            
                            posts.push({
                                title: title,
                                date: new Date().toISOString().split('T')[0], // Today's date as fallback
                                excerpt: `Content for ${title}`,
                                slug: slug
                            });
                            
                            console.warn(`Could not load markdown file: ${filename}. Using fallback metadata.`);
                        }
                    } catch (error) {
                        console.error(`Error loading post ${filename}:`, error);
                    }
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
            postsContainer.innerHTML = '<p>No posts found. Please check your posts/manifest.json file.</p>';
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

// Get base URL based on current environment
function getBaseUrl() {
    // Check if we're on GitHub Pages
    if (window.location.hostname.includes('github.io')) {
        // Extract repository name from path
        const pathParts = window.location.pathname.split('/');
        if (pathParts.length > 1 && pathParts[1]) {
            return '/' + pathParts[1]; // e.g., '/sudip.to'
        }
    }
    return ''; // Local development
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