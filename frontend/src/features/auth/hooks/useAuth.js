import { login, register,getMe,logout } from "../services/auth.api"
import {useContext} from "react"
import { AuthContext } from "../auth.context"

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    async function handleRegister({email, password, username}){
        setLoading(true)
        const data = await register({email, password, username})
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogin({email, password, username}){
        setLoading(true)
        const data = await login({email, password, username})
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogout(){
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }
    async function handleGetMe(){
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    return {user, setUser, loading, setLoading, handleRegister, handleLogin, handleLogout, handleGetMe}
}