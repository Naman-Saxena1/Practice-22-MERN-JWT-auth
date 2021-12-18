import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'
import {useNavigate, Link} from 'react-router-dom'

function Dashboard()
{
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    function populateQuote()
    {
        fetch('http://localhost:1337/api/quote',{
            headers: {'x-access-token':localStorage.getItem('token')}
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status==='ok')
            {
                console.log("weird1!")
                console.log(data)       //{status: 'ok', quote: 'Hyper scape'}
                console.log("weird2!")
                setQuote(data.quote)
            }
            else
            {
                alert(data.error)
            }
        })
    }

    useEffect(() => {
        console.log("Inside Dashboard useEffect")
        const token=localStorage.getItem('token')
        console.log(token)

        if(token)
        {
            const user = jwt.decode(token)
            console.log(user)   //{name: 'Naman333', email: 'naman333@gmail.com', iat: 1639748391}
            if(!user)
            {
                localStorage.removeItem('token')
                console.log("User not present")
                
                navigate('/login')
            }
            else
            {
            populateQuote()
            }
        }   
    }, [])

    function updateQuote(event)
    {
        event.preventDefault()
        console.log(tempQuote)
        fetch('http://localhost:1337/api/quote',{
            method: 'POST',
            headers: {
                'x-access-token':localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote: tempQuote    
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status==='ok')
            {
                setQuote(tempQuote)
            }
            else
            {
                alert(data.error)
            }
        })
    }

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 300);
        console.log('page to reload')
    }

    return (
        <div className='Dashboard-div'>
            <Link id="logoutLink" onClick={refreshPage} to="/">Logout</Link>
            <h1>Your Quote:</h1> 
            <textarea disabled={true} id='quote' rows="20" cols="50" value={tempQuote || quote || "No quote found"}></textarea>
            <form onSubmit={updateQuote}> 
                <input type="text"
                placeholder="Quote"
                value={tempQuote}
                onChange={(e)=>setTempQuote(e.target.value)}/>

                <input type="submit" value="Update quote"/>
            </form>
        </div>
    )
}

export default Dashboard