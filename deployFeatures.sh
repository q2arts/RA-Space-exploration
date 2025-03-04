# Navigate to your repository
cd path/to/RA-Space-exploration

# Create and edit index.html
echo '<!DOCTYPE html>...' > index.html

# Create and edit styles.css
echo 'body { ... }' > css/styles.css

# Create and edit js/scripts.js
echo 'let stressLevel = 30; ...' > js/scripts.js

# Add the files to the repository
git add index.html css/styles.css js/scripts.js

# Commit the changes
git commit -m "update project files"

# Push to GitHub
git push origin master