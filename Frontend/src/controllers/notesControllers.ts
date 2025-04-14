import DoAjax from "@utils/fetch"

export let getNotesByRefId = async (id: string) => {
    if(!id) return null
    let notes = await DoAjax.get(`/notes/getNotesByRefId?id=${id}`).exec()
    if(notes.status === 200){
        return notes.data
    }else{
        return null
    }
}
export let saveNote = async (note) => {
    let notes = await DoAjax.post(`/notes/saveNote`).payload(note).exec()
    if(notes.status === 200){
        return notes.data
    }else{
        return null
    }
}