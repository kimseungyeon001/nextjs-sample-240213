import fetch from 'node-fetch'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '@/config'

const { baseFirstUrl, baseSecondUrl } = config

interface UserName {
    id: string
    name: string
}

interface UserDescription {
    id: string
    description: string
}

interface Data {
    id: string
    name: string
    description: string
}

interface ErrorData {
    message: string
}

class CustomError extends Error {
    statusCode: number

    constructor(message: string, status: number) {
        super(message)
        this.statusCode = status
    }
}

async function buildFetchApi(url: string) {
    try {
        const response = await fetch(url)
        switch (response.ok) {
            case true:
                const result = await response.json()
                return result
            default:
                throw new CustomError(response.statusText, response.status)
        }
    } catch (error) {
        throw error
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
    if (req.method === 'GET') {
        try {
            const userNameResult = (await buildFetchApi(`${baseFirstUrl}/user`)) as UserName
            const userDescriptionResult = (await buildFetchApi(`${baseSecondUrl}/user`)) as UserDescription

            res.status(200).json({
                id: userNameResult.id,
                name: userNameResult.name,
                description: userDescriptionResult.description,
            })
        } catch (error: unknown) {
            switch ((error as CustomError).statusCode) {
                case 404:
                    return res.status(404).json({ message: 'not found' })
                default:
                    return res.status(500).json({ message: 'failed to fetch data' })
            }
        }
    } else {
        res.status(405).json({ message: 'method not allowed' })
    }
}
