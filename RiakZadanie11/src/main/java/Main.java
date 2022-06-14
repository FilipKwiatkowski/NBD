import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.DeleteValue;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;
import com.basho.riak.client.core.query.RiakObject;
import com.basho.riak.client.core.util.BinaryValue;

import java.util.concurrent.ExecutionException;

public class Main {

    public static void main(String[] args) throws Exception {
        Logger logger = new Logger("komunikaty.txt");

        logger.print("\n##### Ustanowienie połączenia #####\n");

        RiakClient client = RiakClient.newClient("127.0.0.1");

        logger.print("\n##### Dodanie dokumentu do bazy #####\n");

        Namespace namespace = new Namespace("s17137");
        Location location = new Location(namespace, "Z11");
        RiakObject riakObject = new RiakObject()
                .setContentType("application/json")
                .setValue(BinaryValue.create("{\"Nazwa\":\"PPJ\", \"trudnosc\":2, \"zdawalnosc\":0.40, \"obieralny\":false}"));

        StoreValue store = new StoreValue.Builder(riakObject).withLocation(location).build();
        StoreValue.Response storeResponse = client.execute(store);

        logger.print(storeResponse);
        logger.print("Dodano dokuement do bazy");

        logger.print("\n##### Pobranie i wyświetlenie dokumentu z bazy #####\n");

        readAndPrint(client, location);

        logger.print("\n##### Modyfikacja dokumentu z bazy #####\n");

        FetchValue fetchValue = new FetchValue.Builder(location).build();
        FetchValue.Response response = client.execute(fetchValue);
        riakObject = response.getValue(RiakObject.class);
        riakObject.setValue(BinaryValue.create("{\"Nazwa\":\"PJC\", \"trudnosc\":3, \"zdawalnosc\":0.40, \"obieralny\":false}"));

        StoreValue update = new StoreValue.Builder(riakObject).withLocation(location).build();
        client.execute(update);

        logger.print("Zmodyfikowano dokument w bazie");

        logger.print("\n##### Pobranie i wyświetlenie dokumentu z bazy #####\n");

        readAndPrint(client, location);

        logger.print("\n##### Usunięcie dokumentu z bazy #####\n");

        DeleteValue delete = new DeleteValue.Builder(location).build();
        client.execute(delete);
        logger.print("Usunięto dokuement z bazy");

        logger.print("\n##### Próba pobrania i wyświetlenia dokumentu z bazy #####\n");

        readAndPrint(client, location);

        logger.print("\n##### Zamknięcie połączenia #####\n");

        client.shutdown();
        logger.close();
    }

    public static void readAndPrint(RiakClient client, Location key) throws ExecutionException, InterruptedException {
        FetchValue fetchValue = new FetchValue.Builder(key).build();
        FetchValue.Response response = client.execute(fetchValue);
        if (response.isNotFound())
            logger.print("not found");
        else {
            RiakObject riakObject = response.getValue(RiakObject.class);
            logger.print(riakObject.getValue());
        }
    }

}
