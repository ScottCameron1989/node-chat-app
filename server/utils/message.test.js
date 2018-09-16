var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
 it('should generate the correct message object', ()=>{
   var message = {from:"john", text:"hello"};
   var receivedMessage = generateMessage(message.from,message.text);
   expect(receivedMessage.text).toBe(message.text);
   expect(receivedMessage.from).toBe(message.from);
   expect(receivedMessage.createdAt).toBeA('number');
 });
});
