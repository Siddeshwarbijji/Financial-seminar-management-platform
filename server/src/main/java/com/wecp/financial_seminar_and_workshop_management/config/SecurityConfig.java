package com.wecp.financial_seminar_and_workshop_management.config;

import com.wecp.financial_seminar_and_workshop_management.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{


    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, JwtRequestFilter jwtRequestFilter,
            PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }


    


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // TODO Auto-generated method stub
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/user/register","/api/user/login").permitAll()
                .antMatchers(HttpMethod.POST,"/api/institution/event").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.PUT,"/api/institution/event/{id}").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.GET,"/api/institution/events").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.POST,"/api/institution/event/{eventId}/resource").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.GET,"/api/institution/event/professionals").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.POST,"/api/institution/event/{eventId}/professional").hasAuthority("INSTITUTION")
                .antMatchers(HttpMethod.GET,"/api/professional/events").hasAuthority("PROFESSIONAL")
                .antMatchers(HttpMethod.PUT,"/api/professional/event/{id}/status").hasAuthority("PROFESSIONAL")
                .antMatchers(HttpMethod.POST,"/api/professional/event/{eventId}/feedback").hasAuthority("PROFESSIONAL")
                .antMatchers(HttpMethod.GET,"/api/participant/events").hasAuthority("PARTICIPANT")
                .antMatchers(HttpMethod.POST,"/api/participant/event/{eventId}/enroll").hasAuthority("PARTICIPANT")
                .antMatchers(HttpMethod.GET,"/api/participant/event/{id}/status").hasAuthority("PARTICIPANT")
                .antMatchers(HttpMethod.POST,"/api/participant/event/{eventId}/feedback").hasAuthority("PARTICIPANT")
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

                http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
       
    }

    

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // TODO Auto-generated method stub
        return super.authenticationManagerBean();
    }
    // Implement security configuration here
    // /api/user/register and /api/user/login should be permitted to all
    // /api/institution/event should be permitted to INSTITUTION
    // /api/institution/event/{id} should be permitted to INSTITUTION
    // /api/institution/events should be permitted to INSTITUTION
    // /api/institution/event/{eventId}/resource should be permitted to INSTITUTION
    // /api/institution/event/professionals should be permitted to INSTITUTION
    // /api/institution/event/{eventId}/professional should be permitted to INSTITUTION

    // /api/professional/events should be permitted to PROFESSIONAL

    // /api/professional/event/{id}/status should be permitted to PROFESSIONAL
    // /api/professional/event/{eventId}/feedback should be permitted to PROFESSIONAL

    // /api/participant/events should be permitted to PARTICIPANT
    // /api/participant/event/{eventId}/enroll should be permitted to PARTICIPANT
    // /api/participant/event/{id}/status should be permitted to PARTICIPANT
    // /api/participant/event/{eventId}/feedback should be permitted to PARTICIPANT

    // Note: Use hasAuthority method to check the role of the user
    // for example, hasAuthority("INSTITUTION")
}