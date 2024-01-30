package com.adopcion.adopcion.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.adopcion.adopcion.models.Greeting;
import com.adopcion.adopcion.models.HelloMessage;
@Controller
public class WebSocketController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000);
        String nameGreeting = message.getName();
        String messageGreeting = message.getMessage();

        System.out.println(nameGreeting);
        System.out.println(messageGreeting);

        return new Greeting(nameGreeting, messageGreeting);
    }
}

