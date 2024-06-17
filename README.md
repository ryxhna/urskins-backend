----- Install Node.js in WSL -----
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v

----- Start to build application -----
node --version
npm init --y
npm install @hapi/hapi
npm install @google-cloud/storage
npm install -g nodemon
npm install --save-dev nodemon
npm install eslint --save-dev
npx eslint --init

----- Client-Side and Server-Side Development -----
npm install @google-cloud/firestore
npm install firebase
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
firebase deploy --config src/firebase-config/firebase.json

----- Machine Learning -----
req tensorflow ml: 2.13.0

npm view @tensorflow/tfjs-node versions
pip install tensorflow==<tab>

npm uninstall @tensorflow/tfjs-node
npm install @tensorflow/tfjs-node@2.13.0

sudo apt update
sudo apt install python3-pip
pip --version
pip install tensorflow

----- Langkah ADC -----
gcloud --version
gcloud init --no-launch-browser
gcloud auth application-default login --no-launch-browser
gcloud config get-value project
npm run start

----- Upload to GitHub -----
git config --global user.email ghina.desrizky@gmail.com
git config --global user.name ryxhna

git init
git add .
git commit -m "controller and profile fix"
git branch -M main
git push -u origin main
git push --force origin main

----- Configure Git to Use the Token (Optional but Recommended) -----
git config --global credential.helper manager-core
git config --global credential.helper store

------------------------------
CATATAN
> We're using admin.firestore() to access Firestore, which is the recommended way when using Firebase Admin SDK.
> token github ghina: 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
> git remote add origin https://github.com/ryxhna/urskins-backend.git
> git remote set-url origin https://ryxhna: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@github.com/ryxhna/urskins-backend.git