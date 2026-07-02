FROM node:22-alpine AS builder

# Work directory
WORKDIR /app

# Copy package.json and lock for dependency Installation
COPY package*.json ./
RUN npm ci

# Copy the source code and build it
COPY . .
RUN npm run build

# Running phase
FROM node:22-alpine AS runner
WORKDIR /app

# Copy the necessary files from the builder stage to reduce the final image size
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app .

ENV PORT=8080
# It must be bound to 0.0.0.0 instead of localhost; otherwise, a 503 error will occur.
ENV HOST=0.0.0.0

EXPOSE 8080

# Start the production server
CMD ["npm", "run", "start"]