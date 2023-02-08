import { createStore } from 'redux'

const initialState = {
    addopen: false,
    deleteopen: false,
    title: '',
    description:'',
    titleerror: false,
    descriptionerror: false,
    newNote: false,
    deleteid: 0
}


const reducer = (state = initialState, action) => {

    if(action.type === 'dialog') {
        return {
            ...state,
            addopen: action.payload
        }
    }

    if(action.type === 'deletedialog') {
        return {
            ...state,
            deleteopen: action.payload
        }
    }

    if(action.type === 'title') {
        return {
            ...state,
            title: action.payload
        }
    }

    if(action.type === 'description') {
        return {
            ...state,
            description: action.payload
        }
    }

    if(action.type === 'titleerror') {
        return {
            ...state,
            titleerror: action.payload
        }
    }

    if(action.type === 'descriptionerror') {
        return {
            ...state,
            descriptionerror: action.payload
        }
    }

    if(action.type === 'newNote') {
        return {
            ...state,
            newNote: !state.newNote
        }
    }

    if(action.type === 'deleteid') {
        return {
            ...state,
            deleteid: action.payload
        }
    }

    return state
}


const store = createStore(reducer)

export default store