FROM node:20-slim

WORKDIR /home/node/app

# 先複製 package.json 利用緩存加速
COPY package*.json ./
RUN npm install

# 複製所有程式碼
COPY . .

# 執行正式環境編譯
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
