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

  const note = req.body && req.body.note;

  if (!note || !note.content || note.content.length === 0) {
    context.res = {
      status: 500,
      body: {
        errorMessage: 'Note is empty.'
      }
    }

    context.done();
    return;
  }

  context.log('NOTE: ', note)

  const noteFromDb = await container.item(note.id, note.groupId).read();

  context.log('NOTE FROM DB: ', noteFromDb.resource);


  const updatedNote = { ...noteFromDb.resource, content: note.content};

  let updatedItem;

  try {
    updatedItem = await container.item(note.id, note.groupId).replace(updatedNote);
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

  context.log('UPDATED ITEM:', updatedNote);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: updatedNote.resource
    };

};

export default httpTrigger;
