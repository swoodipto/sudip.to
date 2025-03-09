// Script to automatically generate manifest.json from markdown files
const fs = require('fs');
const path = require('path');

// Configuration
const POSTS_DIR = 'posts';
const MANIFEST_FILE = path.join(POSTS_DIR, 'manifest.json');

// Function to extract front matter and content from markdown
function extractPostData(markdown, filename) {
    const frontMatterMatch = markdown.match(/^---\s*([\s\S]*?)\s*---/);
    if (!frontMatterMatch) {
        console.warn(`Warning: No front matter found in ${filename}`);
        return null;
    }
    
    const frontMatter = frontMatterMatch[1];
    const content = markdown.replace(/^---\s*[\s\S]*?---/, '').trim();
    
    // Parse front matter
    const titleMatch = frontMatter.match(/title:\s*(.*)/);
    const dateMatch = frontMatter.match(/date:\s*(.*)/);
    const excerptMatch = frontMatter.match(/excerpt:\s*(.*)/);
    
    if (!titleMatch || !dateMatch) {
        console.warn(`Warning: Missing required front matter in ${filename}`);
        return null;
    }
    
    return {
        title: titleMatch[1].trim(),
        slug: path.basename(filename, '.md'),
        date: dateMatch[1].trim(),
        excerpt: excerptMatch ? excerptMatch[1].trim() : '',
        content: content
    };
}

// Main function to build the manifest
async function buildManifest() {
    console.log('Building manifest.json...');
    
    // Check if posts directory exists
    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`Error: Directory '${POSTS_DIR}' not found`);
        process.exit(1);
    }
    
    // Get all markdown files
    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
        console.warn(`Warning: No markdown files found in ${POSTS_DIR}`);
    }
    
    // Process each file
    const posts = [];
    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const postData = extractPostData(content, file);
        
        if (postData) {
            // Check for image paths and ensure they're properly formatted
            // This is just a log to help identify potential issues with image paths
            const imageMatches = postData.content.match(/!\[(.*?)\]\((.*?)\)/g);
            if (imageMatches) {
                console.log(`Found ${imageMatches.length} images in ${file}`);
                imageMatches.forEach(match => {
                    const imagePath = match.match(/!\[(.*?)\]\((.*?)\)/)[2];
                    console.log(`  Image path: ${imagePath}`);
                });
            }
            
            posts.push(postData);
        }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create manifest
    const manifest = {
        files: files,
        posts: posts
    };
    
    // Write manifest file
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    
    console.log(`Successfully created manifest with ${posts.length} posts`);
}

// Run the build
buildManifest().catch(err => {
    console.error('Error building manifest:', err);
    process.exit(1);
}); 