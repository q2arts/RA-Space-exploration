# Navigate to your repository
cd path/to/RA-Space-exploration

# Create and edit index.html
echo '<!DOCTYPE html>...' > index.html

# Create and edit styles.css
echo 'body { ... }' > styles.css

# Create and edit scripts.js
echo 'let stressLevel = 30; ...' > scripts.js

# Add the files to the repository
git add index.html styles.css scripts.js

# Commit the changes
git commit -m "Isolated HTML, CSS, and JavaScript into separate files"

# Push to GitHub
git push origin main