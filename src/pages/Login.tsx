import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../shared/api/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()        // 폼 기본 동작(새로고침) 막기
        setPending(true)
        setError('')

        // Supabase에 로그인 요청만 한다.
        // store에 dispatch 하지 않는다 — AuthListener가 알아서 잡는다.
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        setPending(false)

        if (error) {
            // 어느 쪽이 틀렸는지는 알려주지 않는다 (계정 존재 여부 노출 방지)
            setError('이메일 또는 비밀번호를 확인해주세요.')
            return
        }

        navigate('/')
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='이메일'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='비밀번호'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type='submit' disabled={pending}>
                    {pending ? '로그인 중...' : '로그인'}
                </button>

                {error && <p>{error}</p>}
            </form>
        </>
    )
}
