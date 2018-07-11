# dynamodb-quick

I would recormend using the aws-cli directly for this, it allows you to provide referance to a JSON file to define the table structure.

Creates a table in dynamoDB from a supplied JSON file conforming to the format of the dynamoDB describe table response. This uses the AWS-SDK vs using the cli.

## Example use:

Create a dynamoDB table in the local dynamodb:
``` bash
 dynamodb-quick-table  ./TableDescription.json --region eu-west-1 --endpoint http://localhost:8000

```


## Install

This operates as a CLI, install via npm:

``` bash
npm install -g dynamodb-quick
```
Package published to npm at:
https://www.npmjs.com/package/dynamodb-quick


### Use case:

I use this to stand up local development environments in docker containers, this CLI is used to create the tables on the dynamoDB container.  
