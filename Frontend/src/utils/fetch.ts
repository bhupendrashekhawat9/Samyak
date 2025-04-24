
export default class DoAjax {
    private hostUrl = "https://samyak-50pp.onrender.com/"
    private baseUrl = "api/v1";
    private url: string;
    private header  = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
    }
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    private body: string|null = null;
    private static instance: DoAjax;
    private constructor(url: string, method:'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.url = url;
        this.method = method;
        this.setToken();
    };

    private  setToken(){
        let sessionToken = localStorage.getItem("token")
        if(sessionToken && sessionToken != "undefined"){
            this.header.Authorization = `Bearer ${sessionToken}`
        }
    }
   async exec (){

        let res =  await fetch( this.baseUrl+this.url, {
            method: this.method,
            headers: this.header,
            body: this.body,
        })
        if(res.status === 401 ){
            localStorage.removeItem("token")
            // window.location.href = "/login"
        }
        return await res.json()
    }
    payload(data: unknown) {
        this.body = JSON.stringify(data) as string;
        return this;
    }
    setHeader(header: HeadersInit) {
        this.header = { ...this.header, ...header };
        return this;
    }
    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.method = method;
        return this;
    }
    setUrl(url: string) {
        this.url = url;
        return this;
    }
    static setBaseUrl(url: string) {
        this.instance.baseUrl = url;
        return this.instance;
    }
    static get(url: string) {
        // if (!this.instance) {
        this.instance = new DoAjax(url, "GET");
        return this.instance
    }
    static post(url: string) {
        this.instance = new DoAjax(url, "POST" );
        return this.instance
    }
    static put(url: string) {
        this.instance = new DoAjax(url, "PUT" );
        return this.instance
    }
    static delete(url: string) {
        this.instance = new DoAjax(url, "DELETE");
        return this.instance
    }
}