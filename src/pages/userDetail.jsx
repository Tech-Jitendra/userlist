import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../App'
import { useNavigate } from 'react-router-dom'


export const UserDetail = () => {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    let id = window.location.search?.split('=')[1]

    const getuserData = async (userId) => {
        try {
            const response = await axios.get(
                baseUrl + `/user/${userId}`
            )
            if (response.status == 200) {
                console.log("res0------  ", response.data)
                setUserData(response.data)
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
            getuserData(id)
        }
    }, [id])

    return (
        <>
            <div>userDetails</div>
            <span
                onClick={() => navigate("/")}
            >home</span>
            {
                userData ?
                    <table
                        cellPadding={"10"}
                    >
                        <tr>
                            <th>name</th>
                            <th>age</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>image</th>
                        </tr>
                        <tr>
                            <td>{`${userData?.firstName} ${userData?.lastName}`}</td>
                            <td>{userData?.age}</td>
                            <td>{userData?.email}</td>
                            <td>{userData?.phone}</td>
                            <td>
                                <img
                                    height={"34px"}
                                    width={"34px"}
                                    src={userData?.image} alt="" />
                            </td>
                        </tr>
                    </table>
                    : null
            }
        </>
    )
}
