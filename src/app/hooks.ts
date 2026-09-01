import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 타입을 미리 붙여둔 훅. 앞으로 이것만 쓴다.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()