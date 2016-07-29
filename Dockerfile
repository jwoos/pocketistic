FROM ubuntu

# install packages
RUN apt update && \
	apt install -y vim curl wget && \
	apt upgrade -y
