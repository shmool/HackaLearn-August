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

  const content = req.body && req.body.content;

  if (!content || content.length === 0) {
    context.res = {
      status: 500,
      body: {
        errorMessage: 'Note is empty.'
      }
    }

    context.done();
    return;
  }

  const newItem = {type: 'note', content, groupId: '123456'};
  let createdItem;

  try {
    createdItem = await container.items.create(newItem);
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        errorMessage: error
      }
    }

    context.done();
    return;
  }

  context.log('CREATED ITEM:', createdItem);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: createdItem.resource
    };

};

export default httpTrigger;
