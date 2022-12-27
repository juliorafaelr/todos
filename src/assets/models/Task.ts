export default class Task implements Task {

    id: string
    text: string
    day: string

    constructor( id: string, text: string, day: string ) {
        this.id = id;
        this.text = text;
        this.day = day
    }
}