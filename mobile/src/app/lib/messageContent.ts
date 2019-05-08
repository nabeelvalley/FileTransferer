class MessageContent {

    name: string;
    data: any;
    encoding: string;

    constructor(name: string, data: any, encoding: string) {
        this.name = name;
        this.data = data;
        this.encoding = encoding;
    }
}