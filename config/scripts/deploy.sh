# !/bin/bash

# docker가 없다면, docker 설치
if ! type docker > /dev/null
then
  echo "docker does not exist"
  echo "Start installing docker"
  sudo apt-get update
  sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
  sudo apt update
  apt-cache policy docker-ce
  sudo apt install -y docker-ce
fi

# docker-compose가 없다면 docker-compose 설치
if ! type docker-compose > /dev/null
then
  echo "docker-compose does not exist"
  echo "Start installing docker-compose"
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

echo "start docker-compose up: ubuntu"
docker ps -a | grep hunkicho/jg_front_vue:latest| awk '{print$1}' | xargs -t -I % docker rm -f % && docker image ls | grep hunkicho/jg_front_vue:latest | awk '{print$3}' | xargs -I % docker rmi %
docker ps -a | grep hunkicho/jg_front_nginx:latest | awk '{print$1}' | xargs -t -I % docker rm -f % && docker image ls | grep hunkicho/jg_front_nginx:latest | awk '{print$3}' | xargs -I % docker rmi %
cd ~ && sudo docker-compose pull &&  sudo docker-compose -f docker-compose.yml up --build -d