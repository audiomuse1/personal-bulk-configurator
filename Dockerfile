FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001 5173

CMD ["npm", "run", "dev"]