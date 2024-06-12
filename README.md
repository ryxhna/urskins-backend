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

----- APIs for Login by Google -----
npm install googleapis crypto
npm install dotenv

----- Export APIs -----
export API_KEY=AIzaSyBsckVEqF7E48GvHdIAVvtcTekp8jsxrEc
export GOOGLE_APPLICATION_CREDENTIALS="src/service-key/serviceaccountkey-firestore.json"

----- Firebase CLI -----
- for windows: npm install -g firebase-tools 
- for linux: sudo npm install -g firebase-tools
  sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
  npm install -g firebase-tools
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  source ~/.nvm/nvm.sh
  nvm install node
  nvm use node
  npm install -g firebase-tools
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
  source ~/.bashrc

firebase login
firebase projects:list
firebase init firestore
firebase deploy --only firestore

----- Machine Learning -----
req tensorflow ml: 2.13.0

sudo apt update
sudo apt install python3-pip
pip --version
pip install tensorflow==2.13.0

----- Langkah ADC -----
gcloud --version
gcloud init --no-launch-browser
gcloud auth application-default login --no-launch-browser
gcloud config get-value project
npm run start

----- Upload to GitHub -----
git init
git add .
git commit -m "second commit"
git branch -M main
git remote add origin https://github.com/ryxhna/urskins-backend.git
git push -u origin main


------------------------------
CATATAN
> We're using admin.firestore() to access Firestore, which is the recommended way when using Firebase Admin SDK.