import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)

    }


    const showPassword = (params) => {
        if (ref.current.className === "fas fa-eye-slash") {
            passwordRef.current.type = "password"
            ref.current.className = "fas fa-eye";

        }
        else {
            ref.current.className = "fas fa-eye-slash";
            passwordRef.current.type = "text"
            alert("show the password")
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            console.log(passwordArray)
            toast('Password saved ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
        toast('Error: Password not saved!')
        }


    }
    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let yes = confirm("Do you really want to detete Password?")
        if (yes) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }

        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

    }
    const editPassword = (id) => {
        console.log("Edit password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])

        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(123,210,139,0.5)] opacity-50 blur-[80px]"></div></div>

            <div className="p- md:p-0 md:mycontainer min-h-[85.5vh]">
                <h1 className='text-4xl text-green-800 font-bold text-center'>
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manger</p>

                <div className="text-black flex flex-col p-4 gap-3 items-center ">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-3/4 px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-3/4 gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full p-4 py-1 border border-green-500  ' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full p-4 py-1  border border-green-500 ' type="password" name='password' id='password' />
                            <span className="absolute right-1 top-1.5 cursor-pointer " onClick={showPassword}>
                                <i ref={ref} className="fas fa-eye"></i>
                            </span>


                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit gap-2 
                    border border-green-900 ring-white ring-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords flex flex-col justify-center mx-52">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Password to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center w-full flex items-center justify-center gap-2'><a href={item.site} target='_blank'>{item.site}</a>
                                            <i className="fa-solid fa-copy cursor-pointer" onClick={() => copyText(item.site)}></i></td>
                                        <td className='py-2 border border-white text-center w-50 gap-2'>{item.username} <i className="fa-solid fa-copy cursor-pointer" onClick={() => copyText(item.username)}></i></td>
                                        <td className='py-2 border border-white text-center w-50 gap-2'>{item.password} <i className="fa-solid fa-copy cursor-pointer" onClick={() => copyText(item.password)}></i></td>
                                        <td className='py-2 border border-white text-center w-50 gap-2'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <i className="fa-solid fa-pen-to-square "></i>
                                            </span>
                                            <span className='cursor-pointer'>
                                                <i className="fa-solid fa-trash mx-1" onClick={() => { deletePassword(item.id) }}></i>
                                            </span>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager