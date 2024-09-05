// http://localhost:3000/api/user/get-users
import { useEffect, useState } from "react";

const useFetchUsers = (refresh : boolean) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/get-users',{ next: { revalidate: 10 }});
                const data = await res.json();
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [refresh]);

    return { users, loading, error };
}

export default useFetchUsers;