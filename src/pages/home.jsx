import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { baseUrl } from '../App'
import "./pages.css"

export const Home = () => {
    const [postsData, setPostsData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [sortedData, setSortedData] = useState([])
    const [filterItems, setFilterItems] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(false)
    const navigate = useNavigate()


    const getFilterItems = (items) => {
        let list = []
        if (items && items.posts && items.posts.length) {
            items.posts.forEach((element) => {
                element.tags.forEach((elementItem) => {
                    if (list.indexOf(elementItem) == -1)
                        list.push(elementItem)
                })
            })
            setFilterItems([...list])
        }
    }

    const getPostsData = async () => {
        setIsDataLoading(true)
        try {
            const response = await axios.get(
                baseUrl + "/posts"
            )
            if (response.status == 200) {
                setPostsData(response.data)
                getFilterItems(response.data)
            }
        }
        catch (err) {
            console.log("error ", err.message)
        }
        finally {
            setIsDataLoading(false)
        }
    }

    useEffect(() => {
        getPostsData()
    }, [])

    const sortingData = ["Ascending", "Descending"]

    const handleFiltering = (item) => {
        setSortedData([])
        if (item && postsData.posts && postsData.posts.length) {
            let data = postsData.posts.filter((element) => {
                if (element.tags.indexOf(item)) {
                    return element
                }
            })
            setFilteredData([...data])
        }
    }
    const handleSorting = (item) => {
        setFilteredData([])
        if (item && postsData.posts && postsData.posts.length) {
            let data = postsData.posts
            if (item == "Ascending") {
                data.sort((a, b) => {
                    if (a['title'] < b['title'])
                        return -1
                    else if (a['title'] > b['title'])
                        return 1
                    else return 0
                })
                setPostsData({ posts: [...data] })
            }
            else if (item == "Descending") {
                data.sort((a, b) => {
                    if (a['title'] > b['title'])
                        return -1
                    else if (a['title'] < b['title'])
                        return 1
                    else return 0
                })
                setPostsData({ posts: [...data] })
            }

        }
    }

    if (isDataLoading) {
        return null
    }
    return (
        <>
            <h1>Posts:</h1>
            <div>
                <div className='dropdown'>
                    <button className='dropdownButton'>Filter</button>
                    <div className='dropDownlist'>
                        {
                            filterItems?.length ?
                                filterItems?.map((item, id) => {
                                    return (
                                        <li key={id} onClick={() => handleFiltering(item)}>{item}</li>
                                    )
                                })
                                :
                                <li>no filters</li>
                        }
                    </div>
                </div>
                <div className='dropdown sortData'>
                    <button className='dropdownButton'>sorting</button>
                    <div className='dropDownlist'>
                        {sortingData.map((element, id) => {
                            return (
                                <li key={id} onClick={() => { handleSorting(element) }}>{element}</li>
                            )

                        })}
                    </div>
                </div>
            </div >
            <table
                cellPadding={"10"}
            >
                <tr>
                    <th>id:</th>
                    <th>user id</th>
                    <th>title</th>
                    <th>body</th>
                </tr>
                {
                    filteredData.length ?
                        filteredData.map((item, id) => {
                            return (
                                <tr
                                    key={id}
                                >
                                    <td
                                        onClick={() => {
                                            navigate(`/postDetail?postId=${item.id}`)
                                        }
                                        }
                                    >{item?.id}</td>
                                    <td
                                        onClick={() => {
                                            navigate(`/userDetail?userId=${item.id}`)
                                        }}
                                    >{item.userId}</td>
                                    <td>{item?.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            )
                        })
                        :
                        postsData?.posts?.map((item, id) => {
                            return (
                                <tr
                                    key={id}
                                >
                                    <td
                                        onClick={() => {
                                            navigate(`/postDetail?postId=${item.id}`)
                                        }
                                        }
                                    >{item?.id}</td>
                                    <td
                                        onClick={() => {
                                            navigate(`/userDetail?userId=${item.id}`)
                                        }}
                                    >{item.userId}</td>
                                    <td>{item?.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            )
                        })
                }
            </table>
        </>
    )
}
