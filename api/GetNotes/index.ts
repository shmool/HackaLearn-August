import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const endpoint = process.env.endpoint;
  const key = process.env.key;
  const databaseId = process.env.databaseId;
  const containerName = process.env.containerName;

  const client = new CosmosClient({ endpoint, key});
  const database = client.database(databaseId);
  const container = database.container(containerName);

  const notes = await container.items.readAll().fetchAll();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: notes.resources
    };

};

export default httpTrigger;
