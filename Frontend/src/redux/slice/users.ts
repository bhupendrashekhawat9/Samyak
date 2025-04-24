import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let fetchUserDetails = createAsyncThunk("users/fetchDetails", async () => {
    return new Promise<{ name: string }>((resolve, reject) => {
        
        setTimeout(async () => {
            await fetch("/users/details");
            resolve({
                name: "Bhupendra",
            });
        }, 4000);
    });
});
let usersSlice = createSlice({
    name:"users",
    initialState:{
        name:""
    },
    reducers:{
    updateData:(state,action)=>{
        state.name = action.payload
    }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            console.log(fetchUserDetails.pending)
            return action.payload
        });
    }
})
export {fetchUserDetails}
export const {updateData} = usersSlice.actions
export default usersSlice.reducer