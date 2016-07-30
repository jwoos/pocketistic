FROM jwoos/pocketistic-base

#ENV NVM_DIR="/.nvm"
#ENV NODE_VERSION="v6.3.1"

#RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
#RUN . "${NVM_DIR}/nvm.sh"; \
	#nvm install $NODE_VERSION && nvm alias default $NODE_VERSION;

#RUN . "${NVM_DIR}/nvm.sh"; \
	#npm cache clean -f; \
	#npm install

COPY . /backend
WORKDIR /backend

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get update && apt-get install -y nodejs

RUN npm cache clean; \
	npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
