const SET_CURRENT = (state, obj) => {
    Object.assign(state.current, obj)
}

const UPDATE_CURRENT = (state, obj) => {
    Object.assign(state.current, obj)
}

export default {
    SET_CURRENT,
    UPDATE_CURRENT
}
