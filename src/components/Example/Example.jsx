import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

function Example() {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('in Example.jsx useEffect')
        dispatch({type: 'FETCH_EXAMPLE'})
    }, [])

    const example = useSelector( store => store.exampleReducer)
    console.log('example:', example)

    const exampleList = example => {
        return example.map( item => (
            <p key={item.id}>{item.integer} is {item.string}</p>
        ))
    }

    return (<>
        <h2>Example Component</h2>
        {exampleList(example)}
    </>)
}

export default Example