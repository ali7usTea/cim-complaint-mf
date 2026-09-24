import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useFetch = <T,>(url: string, options: AxiosRequestConfig = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;
