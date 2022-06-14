import java.io.PrintStream;

public class Logger {
    private PrintStream stream;

    public Logger(String filename) {
        this.stream = new PrintStream(filename);
    }

    public void print(String text) {
        stream.println(text);
    }

    public void close() {
        stream.close();
    }
}