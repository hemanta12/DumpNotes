# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/dumpnotes-0.0.1-SNAPSHOT.jar app.jar

# Create volume for H2 database
RUN mkdir -p /data
VOLUME /data

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]