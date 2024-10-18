package ch.branassist.controller;

import ch.branassist.chatbotresponses.EasyTalkResponse;
import ch.branassist.chatbotresponses.WeatherResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/chatbot")
public class ChatBotController {

    private final EasyTalkResponse easyTalkResponse;
    private final WeatherResponse weatherResponse;

    public ChatBotController(EasyTalkResponse easyTalkResponse, WeatherResponse weatherResponse) {
        this.easyTalkResponse = easyTalkResponse;
        this.weatherResponse = weatherResponse;
    }

    @PostMapping("/message")
    public String handleMessage(@RequestBody ChatRequest request) {
        String userMessage = request.getMessage();

        if (userMessage.contains("weather") || userMessage.contains("wetter")) {
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
