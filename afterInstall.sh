source /home/ec2-user/.bash_profile
sudo chmod 777 /home/ec2-user/project/
# sudo chmod 777 /home/ec2-user/project/client/
cd /home/ec2-user/project/
npm install
# npm run installClient
# npm run dev &
nohup node server.js > /dev/null 2>&1 &
# cd /home/ec2-user/project/client
# npm install
# nohup npm start &