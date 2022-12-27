export interface Task {
    type: string,
    id?: string,
    attributes: {
        text: string,
        day: string
        done?: boolean
    }
}