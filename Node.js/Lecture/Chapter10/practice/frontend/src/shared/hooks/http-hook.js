import {useState,useCallback,useRef,useEffect} from 'react'

export const useHttpClient=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState()

    const activeHttpRequests=useRef([])

    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortCtrl=>abortCtrl.abort())
        }
    },[])

    const sendRequest=useCallback(async (url,method='GET',body=null,headers={})=>{
        setIsLoading(true)
        const httpAbortCtrl=new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)
        try {
            const response=await fetch(url,{
                method,
                body,
                headers,
                signal:httpAbortCtrl.signal
                // 시그널을 통해 http request를 언제든지 취소가능
            })
            const responseData=await response.json()
            // 요청에 사용된 컨트롤러 외에 나머지 컨트롤러는 유지한다. (요청이 끝났으므로 지움)
            activeHttpRequests.current=activeHttpRequests.current.filter(reqCtrl=>reqCtrl!==httpAbortCtrl)

            if(!response.ok){
                throw new Error(responseData.message)
            }

            setIsLoading(false)
            return responseData
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
            throw error;
        }
    },[])


    const clearError=()=>{
        setError(null)
    }

    return {isLoading,error,sendRequest,clearError}
}