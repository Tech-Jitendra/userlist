import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../App'
import { useNavigate } from 'react-router-dom'


export const PostDetail = () => {
    const [postData, setPostData] = useState(null)
    const navigate = useNavigate()
    let id = window.location.search?.split('=')[1]


    const getPostData = async (postId) => {
        try {
            const response = await axios.get(
                baseUrl + `/posts/${postId}`
            )
            if (response.status == 200) {
                setPostData(response.data)
            }

        }
        catch (err) {
            console.log("error ", err.message)
        }
        finally {
            // setIsDataLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getPostData(id)
        }
    }, [id])


    return (
        <>
            <h2>post detail</h2>
            <span
                onClick={() => navigate("/")}
            >
                home
            </span>
            {
                postData ?
                    <table
                        cellPadding={"10"}
                    >
                        <tr>
                            <th>title</th>
                            <th>body</th>
                            <th>Reactions</th>
                        </tr>
                        <tr>
                            <td>{postData.title}</td>
                            <td>{postData?.body}</td>
                            <td>{postData?.reactions}</td>
                        </tr>
                    </table>
                    : null
            }
        </>
    )
}
