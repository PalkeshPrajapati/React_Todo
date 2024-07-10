import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-rose-400 py-2'>
                <div>
                    <span className='font-extrabold text-xl'>PalkeshTodo</span>
                </div>
                <ul className='flex gap-9'>
                    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                    <li className='cursor-pointer hover:font-bold transition-all'>My Task</li>
                </ul>
        </nav>
    )
}

export default Navbar
