var vogels = require('vogels');
vogels.AWS.config.update({accessKeyId: 'aws-access-key', secretAccessKey: 'aws-secret-key', region: 'aws-region-code'});

var util = require('util'),
    joi = require('./node_modules/vogels/node_modules/joi/'),
    allAdvertisers = {},
    AWS = vogels.AWS,
    dynamodb = new AWS.DynamoDB(),
    lodash = require('lodash');

var JdAdvertiser = vogels.define('JdAdvertiser', {
  hashKey: 'advertiserId',
  timestamps: true,
  schema: {
    advertiserId: joi.string(),
    defaultCampaign: joi.string()
  }
});

function createAdvertiserTable(){
  vogels.createTables({
    'JdAdvertiser': {readCapacity: 1, writeCapacity: 1}
  }, function(err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Tables has been created');
    }
  });
}


function addNewAdvertiser(advertiserId){
  JdAdvertiser.config({dynamodb: dynamodb});
  JdAdvertiser.create({advertiserId: advertiserId, defaultCampaign: 'camp1'}, function (err, acc) {
  console.log('created new advertiser in DynamoDB');
  });
}

function loadAllAdvertisers(){
  JdAdvertiser.config({dynamodb: dynamodb});
  allAdvertisers = JdAdvertiser.scan().loadAll().exec(advertiserCallback);
}

function advertiserCallback(err, data){
  if(err) {
   console.log('Error running scan', err);
 } else {
   console.log('Found', data.Count, 'items');
   console.log(util.inspect(lodash.map(data.Items, 'attrs')));
 }
}

exports.createAdvertiserTable = createAdvertiserTable;
exports.addNewAdvertiser = addNewAdvertiser;
exports.loadAllAdvertisers = loadAllAdvertisers;
