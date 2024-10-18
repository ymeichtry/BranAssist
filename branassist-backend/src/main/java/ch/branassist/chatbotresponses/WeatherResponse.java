package ch.branassist.chatbotresponses;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@Component
public class WeatherResponse {
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void init() {
        try {
            Dotenv dotenv = Dotenv.load();
            this.apiKey = dotenv.get("WEATHER_API_KEY");

            // Debugging-Ausgaben
            if (apiKey == null || apiKey.isEmpty()) {
                System.out.println("FEHLER: WEATHER_API_KEY ist null oder leer!");
            } else {
                System.out.println("API Key geladen: " + apiKey);
            }
        } catch (Exception e) {
            System.err.println("FEHLER beim Laden der Umgebungsvariablen: " + e.getMessage());
            e.printStackTrace(); // Gibt den vollständigen Stacktrace aus
        }
    }

    // Aktuelles Wetter
    public String getCurrentWeather(String location) {
        String apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=metric";
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return "Das aktuelle Wetter in " + location + " ist: " + response.getBody();
        } else {
            return "Leider konnte ich die Wetterdaten für " + location + " nicht abrufen.";
        }
    }

    // Wetter für die nächste Woche (Vorhersage)
    public String getWeeklyWeather(String location) {
        String apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey + "&units=metric";
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            // Hier kannst du die Antwort verarbeiten, um die wöchentliche Vorhersage anzuzeigen
            return "Die Wettervorhersage für " + location + " in der nächsten Woche ist: " + response.getBody();
        } else {
            return "Leider konnte ich die Wettervorhersage für " + location + " nicht abrufen.";
        }
    }

    // Wetter der letzten Woche (historisch)
    public String getHistoricalWeather(String location) {
        return "Ich kann die Wetterdaten der letzten Woche für " + location + " leider nicht abrufen.";
    }

    // Hauptfunktion zur Bearbeitung der Wetteranfragen
    public String getWeatherResponse(String userMessage) {
        if (userMessage.contains("wetter") || userMessage.contains("wie ist das wetter")) {
            String location = extractLocation(userMessage); // Implementiere diese Methode, um den Ort zu extrahieren
            return getCurrentWeather(location);
        } else if (userMessage.contains("nächste woche")) {
            String location = extractLocation(userMessage);
            return getWeeklyWeather(location);
        } else if (userMessage.contains("letzte woche")) {
            String location = extractLocation(userMessage);
            return getHistoricalWeather(location);
        }
        return "Ich kann dir bei Wetterinformationen nicht helfen.";
    }

    private String extractLocation(String message) {
        // Logik zur Extraktion des Standorts, z.B. durch einfache Textbearbeitung
        // Dies ist ein Platzhalter; du kannst Regex oder andere Methoden verwenden
        String[] words = message.split(" ");
        return words[words.length - 1];
    }
}
