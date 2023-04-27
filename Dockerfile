# Use http-server:0.12.3 as a base image
FROM http-server:0.12.3

# Copy the code to the /public folder
COPY . /public

# Expose port 8080
EXPOSE 8080

# Run the http-server command when the container launches
CMD ["http-server", "/public"]
