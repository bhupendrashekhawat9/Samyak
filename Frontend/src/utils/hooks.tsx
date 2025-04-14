export let useDebounce = (func:(args:any)=>void,delay:number)=>{
    let timeout:NodeJS.Timeout;
    return (...args:unknown[])=>{
        clearTimeout(timeout)
        timeout = setTimeout(()=>func([...args]),delay)
    }
}