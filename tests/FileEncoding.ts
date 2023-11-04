import {Bundle} from "../src/Bundle";
import * as fs from 'fs';

describe('file encoding & decoding test', () => {
    it('file should be encoded', function () {
        const json = fs.readFileSync(__dirname + '/files/default.json', { flag: 'r' });
        const image = fs.readFileSync(__dirname + '/files/default.png', { flag: 'r' });
        let bundle = new Bundle();
        bundle.add('texture', image);
        bundle.add('data', json);
        fs.writeFileSync(__dirname + '/results/default.horizon', bundle.buffer);
    });
    it('file should be decoded', function () {
        const walls = fs.readFileSync(__dirname + '/results/default.horizon', { flag: 'r' });
        let bundle = new Bundle(walls);
        bundle.get('default.json');
    });
});
