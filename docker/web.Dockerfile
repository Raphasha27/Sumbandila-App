FROM node:20-slim as build

WORKDIR /app

# Enable workspaces
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
# If there are shared packages, copy them here too

RUN npm install

COPY apps/web ./apps/web
# COPY packages ./packages 

RUN npm run build --workspace=@sumbandila/web

FROM nginx:alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
