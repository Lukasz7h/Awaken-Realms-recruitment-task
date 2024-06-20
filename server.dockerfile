FROM node:18

WORKDIR /awakenrealms/openllm

COPY package*.json ./
RUN npm install

RUN npm install express helmet zod cheerio @extractus/article-extractor axios swagger-jsdoc swagger-ui-express

COPY . .
CMD [ "node", "index.js" ]

EXPOSE 3000