const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const _ = require('lodash');

const app = require('../app');
const Client = require('../modules/repository/clientRepository');
const Site = require('../modules/repository/siteRepository');
const Worker = require('../modules/repository/workerRepository');

const should = chai.should();

const timeZones = [
  'America/Los_Angeles',
  'America/Denver',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Asia/Dubai'
];

chai.use(chaiHttp);

describe('api test wakeCap', () => {
  /*
   * Adding client
   */
  describe('New client', () => {
    it('Posting new client', (done) => {
      const newClient = {
        name: faker.company.companyName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email()
      };
      chai
        .request(app)
        .post('/api/v0/clients')
        .send(newClient)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  /*
   * Adding Site
   */
  describe('Adding new Site', () => {
    it('New site', (done) => {
      Client.findAll().then((clients) => {
        const newSite = {
          clientId: _.sample(clients)._id,
          name: faker.company.companyName(),
          coordinates: [faker.random.number(), faker.random.number()],
          timezone: _.sample(timeZones),
          startingHour: 8,
          endingHour: 17,
          lateThresholdHour: 1,
          totalInactiveHours: 1
        };
        chai
          .request(app)
          .post('/api/v0/sites')
          .send(newSite)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    });
  });

  /*
   * Adding Worker
   */
  describe('Adding new Worker', () => {
    it('New Worker', (done) => {
      Site.findAll().then((sites) => {
        let { _id, clientId } = _.sample(sites);
        clientId = clientId._id;
        console.log(_id, clientId);

        const newWorker = {
          name: faker.name.firstName(),
          clientId,
          siteId: _id
        };
        chai
          .request(app)
          .post('/api/v0/workers')
          .send(newWorker)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    });
  });

  /*
   * Adding Asset log
   */
  describe('Adding new asset log', () => {
    it('New Asset', (done) => {
      Worker.findAll().then((workers) => {
        const { _id: worker_id } = _.sample(workers);
        const is_active = _.sample([true, false]);
        const newAsset = {
          coordinates: {
            coordinates: [faker.random.number(), faker.random.number()],
            type: 'Point'
          },
          is_active,
          duration: faker.random.number({
            min: 50,
            max: 120
          }),
          worker_id
        };
        chai
          .request(app)
          .post('/api/v0/assets')
          .send(newAsset)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    });
  });
});
