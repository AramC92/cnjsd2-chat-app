'use strict';

const expect = require('expect');

const { generateMessage } = require('./message.js');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'user';
        let text = 'text';
        let msg = generateMessage(from, text);

        expect(msg.from).toEqual(from);
        expect(msg.text).toEqual(text);
        expect(typeof msg.createdAt).toBe('number');
    });
});