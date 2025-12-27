# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set working directory
WORKDIR /client

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application for production
#RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "dev"]