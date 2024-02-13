import { http, HttpResponse, delay } from 'msw'
import { config } from '@/config'

const { baseFirstUrl, baseSecondUrl } = config

export function buildUserNameFetch() {
    return http.get(`${baseFirstUrl}/user`, async () => {
        return HttpResponse.json({
            id: 'user-id',
            name: 'user name',
        })
    })
}

export function buildUserDescriptionFetch() {
    return http.get(`${baseSecondUrl}/user`, async () => {
        return HttpResponse.json({
            id: 'user-id',
            description: 'user description',
        })
    })
}

export const handlers = [buildUserNameFetch(), buildUserDescriptionFetch()]
