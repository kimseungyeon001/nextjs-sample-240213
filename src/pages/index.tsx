import { useUserProfileQuery } from '@/queries/useUserProfileQuery'

export default function Home() {
    const { isLoading, error, data } = useUserProfileQuery()

    if (isLoading) return <div>...loading</div>
    if (error) return <div>{error.message}</div>
    return <div>{JSON.stringify(data)}</div>
}
