FROM node:20

WORKDIR /work-tracker

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install bcrypt

COPY . .

EXPOSE 5174

CMD [ "npm", "run", "devStart" ]