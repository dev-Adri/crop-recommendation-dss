# Use Node.js LTS (long-term support) version as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory inside the container
COPY . .

# Expose port 5000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
