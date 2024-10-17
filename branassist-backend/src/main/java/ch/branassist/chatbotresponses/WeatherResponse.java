package ch.branassist.chatbotresponses;

public class WeatherResponse {

    public String getWeatherResponse(String userMessage) {
        // Hier könnte eine Logik integriert werden, um Wetterdaten abzurufen.
        if (userMessage.contains("weather") || userMessage.contains("wie ist das wetter")) {
            return "Es ist sonnig mit einer Temperatur von 20 Grad.";
        }
        return "Ich kann dir bei Wetterinformationen nicht helfen.";
    }
}
