FROM phusion/baseimage:0.9.22

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && \
	apt-get install -y make chromium-browser nodejs xvfb postgresql-client && \
	apt-get upgrade -y && \
	rm -rf /var/lib/apt/lists/*

# install yarn
ENV PATH="/root/.yarn/bin:${PATH}"
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn global add sequelize-cli
RUN yarn install

ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir -p pocketistic

WORKDIR /pocketistic/

ENTRYPOINT ["/sbin/my_init", "--skip-startup-files", "--skip-runit", "--", "./scripts/run.sh"]
