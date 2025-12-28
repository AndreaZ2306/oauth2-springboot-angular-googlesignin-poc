package com.aghairsalon.resourceserver;

import com.aghairsalon.resourceserver.config.TestSecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestSecurityConfig.class)
class ResourceserverApplicationTests {

    @Test
    void contextLoads() {}
}
