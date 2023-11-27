FROM node:21-alpine

RUN apk add --update make gcc g++ chromium

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 9090

CMD ["npm","start"]