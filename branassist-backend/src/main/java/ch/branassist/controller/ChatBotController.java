package ch.branassist.controller;

import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/chatbot")
public class ChatBotController {

    @PostMapping("/message")
    public String handleMessage(@RequestBody ChatRequest request) {
        String userMessage = request.getMessage();

        // Hier kann eine KI-Logik oder ein einfacher Algorithmus hinzugefügt werden.
        String botResponse = generateResponse(userMessage);

        return botResponse;
    }

    // Beispiel für eine einfache Antwort-Logik
    private String generateResponse(String userMessage) {
        if (userMessage.equalsIgnoreCase("hello")) {
            return "Hello! How can I help you today?";
        } else if (userMessage.equalsIgnoreCase("bye")) {
            return "Goodbye! Have a great day!";
        } else {
            return "I'm not sure I understand. Can you please clarify?";
        }
    }

    static class ChatRequest {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
