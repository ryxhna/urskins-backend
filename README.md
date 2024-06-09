----- Install Node.js in WSL -----
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v

----- Start to build application -----
node --version
npm init --y
npm install @hapi/hapi
npm install eslint --save-dev
npx eslint --init
npm install @google-cloud/firestore
npm install firebase-admin

export GOOGLE_APPLICATION_CREDENTIALS="./serviceaccountkey-firestore.json"

----- Machine Learning -----
req tensorflow ml: 2.13.0

sudo apt update
sudo apt install python3-pip
pip --version
pip install tensorflow==2.13.0

----- Upload to GitHub -----
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ryxhna/urskins-backend.git
git push -u origin main