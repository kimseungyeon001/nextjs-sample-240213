import { config } from '@/config'

const { baseUrl } = config

export interface UserProfile {
    id: string
    name: string
    description: string
}

class CustomError extends Error {
    statusCode: number

    constructor(message: string, status: number) {
        super(message)
        this.statusCode = status
    }
}

export async function fetchUserProfile(): Promise<UserProfile> {
    try {
        const response = await fetch(`${baseUrl}/profile`)
        switch (response.ok) {
            case true:
                return response.json()
            default:
                const message = response.statusText
                const statusCode = response.status
                throw new CustomError(message, statusCode)
        }
    } catch (error: unknown) {
        console.warn('fetch-user-profile error', error)
        switch ((error as CustomError).statusCode) {
            case 404:
                throw new Error('not found')
            default:
                throw new Error('unexpected error')
        }
    }
}
