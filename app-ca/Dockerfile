# Stage 1: Build Angular app with pnpm
FROM node:22-alpine AS build

# Enable pnpm via corepack (built-in Node.js package manager manager)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy pnpm-lock.yaml and package.json
COPY pnpm-lock.yaml package.json ./

# Install dependencies (pnpm ci for deterministic, reproducible builds)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Angular app for production
# Angular 19 outputs to dist/<project-name>/browser
RUN pnpm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy custom NGINX config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app from stage 1
# Make sure this matches your Angular project output directory
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
