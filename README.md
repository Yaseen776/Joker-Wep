# Joker-Wepcurl -L -o joker-webapp-full.zip https://chat.openai.com/mnt/data/joker-webapp-full.zip
unzip joker-webapp-full.zip -d joker-webapp
mv joker-webapp/* .
rm -rf joker-webapp joker-webapp-full.zip
