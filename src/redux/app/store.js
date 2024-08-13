import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const postDetails = createAsyncThunk("postUsers",async(formData)=>{
        
    try {
        const response = await fetch('http://localhost:4000/users',{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();
        return data

    } catch (error) {
        return error
    }
})

export const getDetails = createAsyncThunk("getUsers",async()=>{
     try {
        const response = await fetch('http://localhost:4000/users');
        const data = await response.json();
        return data
     } catch (error) {
        return error
     }
})


export const deleteUser = createAsyncThunk("deleteUser",async(id)=>{
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`,{
                method:'DELETE'
            })
            const data = response.json();
            return data
        } catch (error) {
            return error
        }
})

export const upDateUser = createAsyncThunk("edituser",async({id,formData})=>{
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`,{
                method:'PUT',
                body:JSON.stringify(formData),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = response.json();
            return data
        } catch (error) {
            return error
        }
})





const userSlice = createSlice({
     name:'users',
     initialState:{
        isLoading:false,
        users:[],
        singleData:"",
        isError:null
     },
     reducers:{
       singleUser:(state,action) =>{
         state.singleData = action.payload
       } 
     },
     extraReducers:(builder)=>{
          builder
          .addCase(postDetails.pending,(state)=>{
            state.isLoading = true;
            state.isError = null;
          })
          .addCase(postDetails.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.users.push(action.payload)
          })
          .addCase(postDetails.rejected,(state,action)=>{
            state.isLoading = false;
             state.isError = action.error.message;
          })
          .addCase(getDetails.pending,(state)=>{
            state.isLoading = true;
            state.isError = null;
          })
          .addCase(getDetails.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.users = action.payload
          })
          .addCase(getDetails.rejected,(state,action)=>{
            state.isLoading = false;
             state.isError = action.error.message;
          })
          .addCase(deleteUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = null;
          })
          .addCase(deleteUser.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.users = state.users.filter(user=>user.id !== action.payload.id);
          })
          .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading = false;
             state.isError = action.error.message;
          })
         .addCase(upDateUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = null;
         })
         .addCase(upDateUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.users = state.users = state.users.map(user=>user.id === action.payload.id ? action.payload : user);
         })
         .addCase(upDateUser.rejected,(state,action)=>{
           state.isLoading = false;
            state.isError = action.error.message;
         })
          
     }
})

const store = configureStore({
     reducer:{
        app:userSlice.reducer
     }
});

export const {singleUser} = userSlice.actions

export default store