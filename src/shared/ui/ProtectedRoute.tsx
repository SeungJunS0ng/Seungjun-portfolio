import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const user = useAppSelector(state => state.auth.user)
    const status = useAppSelector(state => state.auth.status)

    // 아직 세션 확인 중이면 판단을 미룬다.
    // 이 줄이 없으면 새로고침할 때마다 로그인 페이지로 튕긴다.
    if (status === 'loading') return <p>확인 중...</p>

    // 확인이 끝났는데 로그인이 아니면 로그인 페이지로 보낸다.
    if (!user) return <Navigate to='/login' replace />

    return <>{children}</>
}
