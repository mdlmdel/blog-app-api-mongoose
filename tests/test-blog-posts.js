const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Specify "should" syntax with chai throughout
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {BlogPost} = require('../models');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// Use Faker.js library to simplify creating test data. 
// It generates placeholder values for different fields that we can put in mongo
function seedBlogPostData() {
  console.info('seed the database');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      author: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      },
      title: faker.lorem.sentence(),
      content: faker.lorem.text()
    });
  }
  // This will return a promise
  return BlogPost.insertMany(seedData);
}

// Tear down database and then add "describe" blocks