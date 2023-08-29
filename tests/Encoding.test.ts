import {Bundle} from "../src/Bundle";
import * as fs from 'fs';

describe('encoding & decoding test', () => {
    it('should be encoded', function () {
        const json = fs.readFileSync(__dirname + '/files/walls.json', { flag: 'r' });
        const image = fs.readFileSync(__dirname + '/files/walls.png', { flag: 'r' });
        let bundle = new Bundle();
        bundle.add("spritesheet", json);
        bundle.add("image", image);
    });
    it('should be decoded', function () {
        const json = fs.readFileSync(__dirname + '/files/walls.json', { flag: 'r' });
        const image = fs.readFileSync(__dirname + '/files/walls.png', { flag: 'r' });
        let bundle = new Bundle();
        bundle.add("spritesheet", json);
        bundle.add("image", image);
        const buffer = bundle.buffer;

        const bundle2 = new Bundle(buffer);
        bundle2.get("spritesheet");
        bundle2.get("image");
    });
});
