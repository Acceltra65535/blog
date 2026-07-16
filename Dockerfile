# Running phase: use Node.js 22 alpine lightweight image
FROM node:22-alpine

# Work directory
WORKDIR /app

# Copy package.json and lock and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the locally built dist folder
COPY dist ./dist

ENV PORT=8080
# It must be bound to 0.0.0.0 instead of localhost; otherwise, a 503 error will occur.
ENV HOST=0.0.0.0

EXPOSE 8080

# Start the production server
CMD ["npm", "run", "start"]