'use client'
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Offcanvas() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center lg:hidden">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>
            <Button onClick={() => setVisible(true)} className='w-full flex justify-center items-center'>
                <GiHamburgerMenu className='text-3xl'/>
            </Button>
        </div>
    )
}
