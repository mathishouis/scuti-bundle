import { BufferWS } from 'buffer.ws';
import { deflate, inflate } from 'pako';
import { Buffer } from 'buffer';

export class Bundle {
    public readonly files: Map<string, Buffer>;

    constructor(buffer?: Buffer) {
        this.files = new Map<string, Buffer>();
        if (buffer) this._parse(buffer);
    }

    private _parse(buffer: Buffer): void {
        const parsedBuffer: BufferWS = new BufferWS(inflate(buffer));
        const fileCount: number = parsedBuffer.readShort();

        for (let i: number = 0; i < fileCount; i++) {
            const fileName: string = parsedBuffer.readString();
            const fileLength: number = parsedBuffer.readInt();
            const fileBuffer: Buffer = parsedBuffer.readBytes(fileLength).buffer;

            this.add(fileName, fileBuffer);
        }
    }

    public add(name: string, data: Buffer): void {
        this.files.set(name, data);
    }

    public get(name: string): Buffer {
        return this.files.get(name);
    }

    public get buffer(): Buffer {
        const buffer: BufferWS = new BufferWS();

        buffer.writeShort(this.files.size);

        for(const file of this.files.entries())
        {
            const fileName: string = file[0];
            const fileBuffer: Buffer = file[1];

            buffer.writeString(fileName);
            buffer.writeInt(fileBuffer.length);
            buffer.writeBytes(fileBuffer);
        }

        buffer.flip();

        return deflate(buffer.buffer);
    }
}
