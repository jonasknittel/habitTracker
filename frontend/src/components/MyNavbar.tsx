import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';

import { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';

import { getUser, updateUser, deleteUser } from '../api/userApi';
import styles from "./MyNavbar.module.css";

export default function MyNavbar() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState< 'username' | 'email' | null>(null);
    const [newUsername, setNewUsername] = useState("username");
    const [newEmail, setNewEmail] = useState("email");

    // Fetch username
    useEffect(() => {
        const fetchUsername = async () => {
            const response = await getUser();
            const user = response.data[0];
            setUsername(user.name || "no Username");
            setEmail(user.email || "no Email");
            setNewUsername(user.name);
            setNewEmail(user.email);
        };
        fetchUsername();
    }, []);

    const handleUserUpdate = async () => {
        const payload: any = {};
        if (newUsername !== username) payload.name = newUsername;
        if (newEmail !== email) payload.email = newEmail;

        if (Object.keys(payload).length === 0) {
            setEditing(null);
            return;
        }

        await updateUser(payload);
        if (payload.name) setUsername(payload.name);
        if (payload.email) setEmail(payload.email);
        setEditing(null);
    };

    const handleDelete = async() => {
        await deleteUser();
    }
 
    function DropdownMenu() {

        interface DropdownItemProps {
            leftIcon?: React.ReactNode;
            rightIcon?: React.ReactNode;
            content: React.ReactNode; // instead of children
        }

        function DropdownItem(props: DropdownItemProps) {
            return (
                <div className={styles.menuItem}>
                    <span>{props.leftIcon}</span>
                    {props.content}
                    <span className={styles.iconRight}>{props.rightIcon}</span>
                </div>
            );
        }

        return (
            <div className={styles.dropdown}>
                <DropdownItem
                    leftIcon={<i className="pi pi-user" />}
                    content={
                        editing === 'username' ? (
                            <input
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                onBlur={handleUserUpdate}
                                onKeyDown={(e) => e.key === 'Enter' && handleUserUpdate()}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => {setEditing('username'); setNewUsername('');}}>{username}</span>
                        )
                    }
                />

                <DropdownItem
                    leftIcon={<i className="pi pi-envelope" />}
                    content={
                        editing === 'email' ? (
                            <input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                onBlur={handleUserUpdate}
                                onKeyDown={(e) => e.key === 'Enter' && handleUserUpdate()}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => setEditing('email')}>{email}</span>
                        )
                    }
                />
                <DropdownItem
                    leftIcon={<i className='pi pi-trash'></i>}
                    content={
                        <span onClick={() => handleDelete()}>Delete</span>
                    }
                />
            </div>
        )
    }

    function End(props: any) {
        return (
            <div  className={styles.end}>
                <p className={styles.usernameText}>{username}</p>

                <div style={{ position: "relative" }}>
                    <div 
                        className={styles.iconContainer} 
                        onClick={() => setOpen(!open)}
                    >
                        <i className="pi pi-user text-xl" style={{ fontSize: '2vw' }}></i>
                    </div>
                    {open && props.children}
                </div>
            </div>
        );
    }

    return (
        <Menubar end={<End><DropdownMenu /></End>} style={{ justifyContent: "center" }}></Menubar>
    )
}