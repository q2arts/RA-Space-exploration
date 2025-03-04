# Navigate to your repository
cd path/to/RA-Space-exploration

# Create and edit index.html
echo '<!DOCTYPE html>...' > features.html

# Create and edit styles.css
echo 'body { ... }' > css/styles.css

# Create and edit js/features.js
echo 'let stressLevel = 30; ...' > js/features.js

# Add the files to the repository
git add features.html css/styles.css js/features.js

# Commit the changes
git commit -m "update project files"

# Push to GitHub
git push origin master