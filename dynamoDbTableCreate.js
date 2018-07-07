#! /usr/bin/env node
/**
* Create DynamoDB Table via SDK
*
* The CLI does not apper to accept the JSON that the describe JSON CLI command spits out, for this reason I have 
* created this utility to create a dynamoDB table using the JSON via the SDK.
*
* It is expected that the path to the table descriotion JSON is provided as the argument to this execution.
* This was made for use as a part of standing up a docker development environment for a serverless AWS based
* architexture.
*
* Robert Curran 2018
*/

const fs = require('fs');
const util = require('util');
const argv = require('yargs').argv;
const readFile = util.promisify(fs.readFile)
const AWS = require("aws-sdk");

const AWS_REGION_DEFAULT = 'eu-west-1';


/**
* getTableDescription
*
* Gets the JSON structure stored at the provided file path
* @parm filePath    File path of the JSON file
*/
const getTableDescription = async (filePath) => {
    return new Promise(async (resolve, reject) => {
        try {

            return resolve(JSON.parse(await readFile(filePath, 'utf8')));
            
        } catch (err) {
            console.log('Failed to read file');
            reject(err);
        }

    });
}

/**
* createTable
*
* Creates a dynamoDb table with the table description JSON at the supplied path
* @param tableDescriptionFilePath   File path to table description JSON 
*/
const createTable = async (tableDescriptionFilePath) => {
    try {

        // Basic validation
        if (!tableDescriptionFilePath) throw new Error('no table description file path passed.');

        const tableDescription = await getTableDescription(tableDescriptionFilePath);

        // Try to create the DB table
        const dynamoDbResp =  await dynamodb.createTable(tableDescription).promise();

        console.log('Created DynanmoDB Table \n\r\n\r');
        console.log(JSON.stringify(dynamoDbResp, null, 2));


    } catch (err) {
        console.log('Failed to create new DynamoDB table \n\r\n\r');
        console.log(err);
    }

}



//
//  Extract the config from the args array, setup AWS-SDK then call the create table function
//
//



// Extract the filepath from the args
const filePath = process.argv[2];

let AWSConfig = {};

if(argv.region) {
    AWSConfig.region = argv.region;

} else {
    AWSConfig.region = AWS_REGION_DEFAULT;
}


if (argv.endpoint) {
    AWSConfig.endpoint = argv.endpoint 
}

// Initilise AWS
AWS.config.update(AWSConfig);
// Initilise DynamoDB 
const dynamodb = new AWS.DynamoDB();

// Create table
createTable(filePath);



