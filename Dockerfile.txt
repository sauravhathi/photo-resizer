# Use the official nginx image as the base
FROM nginx:alpine

# Copy the files to the default nginx directory
COPY . /usr/share/nginx/html
