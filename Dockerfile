FROM phusion/baseimage:0.9.19

RUN apt-get update && \
	apt-get install -y build-essential; \
	apt-get upgrade -y;
