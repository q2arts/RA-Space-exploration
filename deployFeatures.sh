# Navigate to your repository
cd path/to/RA-Space-exploration

# Create and edit index.html
echo '<!DOCTYPE html>...' > index.html

# Create and edit index.css
echo 'body { ... }' > css/index.css

# Create and edit js/index.js
echo 'let stressLevel = 30; ...' > js/index.js

# Add the files to the repository
git add index.html css/index.css js/index.js

# Commit the changes
git commit -m "update project files"

# Push to GitHub
git push origin master