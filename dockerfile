FROM node:14.18-alpine
WORKDIR /usr/src/app
COPY . .

# RUN npm install

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]