import {Bundle} from "../src/Bundle";
import * as fs from 'fs';

describe('file encoding & decoding test', () => {
    it('file should be encoded', function () {
        const json = fs.readFileSync(__dirname + '/files/walls.json', { flag: 'r' });
        const image = fs.readFileSync(__dirname + '/files/walls.png', { flag: 'r' });
        let bundle = new Bundle();
        bundle.add('spritesheet', json);
        bundle.add('image', image);
        fs.writeFileSync(__dirname + '/results/walls.bundle', bundle.buffer);
    });
    it('file should be decoded', function () {
        const walls = fs.readFileSync(__dirname + '/results/walls.bundle', { flag: 'r' });
        let bundle = new Bundle(walls);
        bundle.get('spritesheet');
        bundle.get('image');
    });
});
