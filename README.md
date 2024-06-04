node --version
npm init --y
npm install @hapi/hapi
npm install eslint --save-dev
npx eslint --init
npm install @google-cloud/firestore
npm install firebase-admin


----- Upload to GitHub -----
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ryxhna/upload.git
git push -u origin main