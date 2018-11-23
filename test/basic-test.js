// TESTING INCLUDES 
const expect = require("chai").expect;
const assert = require('assert');
const VirtualAlexa = require("virtual-alexa").VirtualAlexa;
const nock = require('nock');
const name = 'Test User';

describe("Test the hello world skill", function () {
	let alexa;
	beforeEach(function () {
		nock('https://swapi.co')
			.get(function (uri) {
				return uri.indexOf('api/people/1/') >= 0;
			})
			.reply(200, {
				name: name
			});
		alexa = VirtualAlexa.Builder()
			.handler("./lambda/custom/index.handler") // Lambda function file and name
			.interactionModelFile("./models/en-US.json")
			.create();
	});

	it("Should agree that true is true", function () {
		expect(true).to.be.true;
	});

	it("Should agree that true is true asynchronously", function (done) {
		setTimeout(() => {
			expect(true).to.be.true;
			done();
		}, 500);
	});

	it("Should launch the skill and get the correct", function (done) {
		alexa.launch().then((resp) => {
			expect(resp.response.outputSpeech.ssml).to.contain('I am ' + name + ', welcome to the Alexa Skills Kit!');
			done();
		})
	});

	it("Should utter hello and get a response", function (done) {
		alexa.utter("hello").then((result) => {
			expect(result.response.outputSpeech.ssml).to.include("Hello World from " + name);
			done();
		});
	});
})
