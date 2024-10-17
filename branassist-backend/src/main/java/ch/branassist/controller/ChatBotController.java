package ch.branassist.controller;

import ch.branassist.chatbotresponses.EasyTalkResponse;
import ch.branassist.chatbotresponses.WeatherResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/chatbot")
public class ChatBotController {

    private final EasyTalkResponse easyTalkResponse = new EasyTalkResponse();
    private final WeatherResponse weatherResponse = new WeatherResponse();

    @PostMapping("/message")
    public String handleMessage(@RequestBody ChatRequest request) {
        String userMessage = request.getMessage();

        // Hier kannst du entscheiden, welche Antwortmethode aufzurufen ist
        if (userMessage.contains("weather")) {
            return weatherResponse.getWeatherResponse(userMessage);
        } else {
            return easyTalkResponse.generateResponse(userMessage);
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
