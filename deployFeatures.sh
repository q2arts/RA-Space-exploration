# Navigate to your repository
cd path/to/RA-Space-exploration

# Create and edit index.html
echo '<!DOCTYPE html>...' > index.html

# Create and edit home.css
echo 'body { ... }' > css/home.css

# Create and edit js/home.js
echo 'let stressLevel = 30; ...' > js/home.js

# Add the files to the repository
git add index.html css/home.css js/home.js

# Commit the changes
git commit -m "update project files"

# Push to GitHub
git push origin master