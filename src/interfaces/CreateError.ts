export interface CreateError {
    detail: string,
    source?: {
      pointer: string
    },
    status: string,
    title: string
} 