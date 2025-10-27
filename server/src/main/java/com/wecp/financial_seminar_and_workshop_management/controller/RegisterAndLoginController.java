package com.wecp.financial_seminar_and_workshop_management.controller;


import com.wecp.financial_seminar_and_workshop_management.dto.LoginRequest;
import com.wecp.financial_seminar_and_workshop_management.dto.LoginResponse;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.jwt.JwtUtil;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import com.wecp.financial_seminar_and_workshop_management.jwt.JwtUtil;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController

public class RegisterAndLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // register user
        if(userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("User already registered");
        }
        if(userRepository.findByEmail(user.getEmail()) != null)
        {
            throw new RuntimeException("Email is already in use");
        }
        return new ResponseEntity<User>(userService.registerUser(user),HttpStatus.CREATED);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest){

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            User user = userRepository.findByUsername(loginRequest.getUsername());
            if(user == null)
            {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid username or password");
            }
            final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
            final String token = jwtUtil.generateToken(userDetails.getUsername());
            //final String token = jwtUtil.generateToken(user.getUsername());
            final String role = user.getRole();
            final Long userId = user.getId();

        return new ResponseEntity<LoginResponse>(new LoginResponse(userId, token, user.getUsername(),user.getEmail(),role ),HttpStatus.OK);
        }
        catch(AuthenticationException rex)
        {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password",rex);
        }
        // catch(Exception ex)
        // {
        //     throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Unexpected error",ex);
        // }

       
        // User user = userRepository.findByUsername(loginRequest.getUsername());

        
        // login user
        // return JWT token in LoginResponse object
        // if login fails, return 401 Unauthorized http status
        // User user = userService.getUserByUsername(loginRequest.getUsername());
        // System.out.println(user);
        // if(user==null || !user.getPassword().equals(loginRequest.getPassword()))
        // {
        //     return new ResponseEntity<String>("Invalid username and password",HttpStatus.UNAUTHORIZED);
        // }
        // return new ResponseEntity<>(user, HttpStatus.OK);
        
    }

    // @GetMapping("/api/user/profile/{username}")
    // public ResponseEntity<User> getUser(@PathVariable String username){
    //     // System.out.println("here");
    //     User user = userService.getUserByUsername(username);
    //     if(user == null){
    //         return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    //     }
    //     return new ResponseEntity<User>(user, HttpStatus.OK);
    // }


    // @ExceptionHandler(RuntimeException.class)
    // public ResponseEntity<?> handleRuntimeException(RuntimeException re)
    // {
    //     return new ResponseEntity<String>(re.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    // }
}
