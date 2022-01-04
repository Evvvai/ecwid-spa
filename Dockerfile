# ---- Build ---- #
FROM node:16.13 AS dist
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY . ./
RUN yarn run build

# ---- Release Nginx ---- #
FROM nginx:1.21.5-alpine

COPY --from=dist dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
