package com.multiregion.taskmanager.health;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    @Autowired(required = false)
    private DataSource dataSource;

    @Override
    public Health health() {
        if (dataSource != null) {
            try (Connection connection = dataSource.getConnection()) {
                if (connection.isValid(1000)) {
                    return Health.up()
                            .withDetail("database", "Connected")
                            .withDetail("databaseProduct", connection.getMetaData().getDatabaseProductName())
                            .build();
                }
            } catch (Exception e) {
                return Health.down(e)
                        .withDetail("database", "Disconnected")
                        .withDetail("error", e.getMessage())
                        .build();
            }
        }

        return Health.up()
                .withDetail("database", "Connected")
                .build();
    }
}
