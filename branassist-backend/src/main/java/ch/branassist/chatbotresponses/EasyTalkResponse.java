package ch.branassist.chatbotresponses;

import org.springframework.stereotype.Component;

@Component
public class EasyTalkResponse {

    public String generateResponse(String userMessage) {
        if (userMessage.contains("hello") || userMessage.contains("hi")) {
            return "Hello! How can I assist you today?";
        } else if (userMessage.contains("how are you")) {
            return "I'm just a bot, but thanks for asking!";
        } else if (userMessage.contains("bye") || userMessage.contains("see you")) {
            return "Goodbye! It was nice talking to you!";
        } else {
            return "I'm not sure I understand. Can you ask me something else?";
        }
    }
}
