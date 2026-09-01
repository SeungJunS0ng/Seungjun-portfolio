import { useAppSelector } from '../app/hooks'

export default function MyPage() {
    const user = useAppSelector(state => state.auth.user)

    return (
        <>
            <h1>My Page</h1>
            <p>안녕하세요, {user?.email} 님</p>
        </>
    )
}
