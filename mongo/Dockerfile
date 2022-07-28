mongodb:
    image: mongo:latest
    container_name: mongo-db
    volumes:
      - data-volume:/data/db
    ports:
      - "27017:27017"
    networks:
      - app-network