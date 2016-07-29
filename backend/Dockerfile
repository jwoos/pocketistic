FROM jwoos/pocketistic-base

# install nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
RUN nvm install v6.3.1 && nvm alias default v6.3.1

RUN npm cache clean -f && \
	npm install

COPY . /backend

ENTRYPOINT ['npm', 'start']
