into aws

sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo service mongod start
pm2 start dist/main.js - into path

npm run start:debug

