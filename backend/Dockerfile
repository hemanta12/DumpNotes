# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/dumpnotes-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE $PORT
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"]