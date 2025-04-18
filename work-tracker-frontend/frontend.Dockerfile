FROM node:20

WORKDIR /work-tracker

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]