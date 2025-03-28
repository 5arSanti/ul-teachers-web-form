import { handleNotifications } from "../handleNotifications";

export const getValues = async (setLoading, setPostulations) => {
    setLoading(true);

    try {
        const response = await fetch(import.meta.env.VITE_API_GOOGLE_APP_SHEET, {
            redirect: "follow",
            method: "GET",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
        });

        const data = await response.json();

        if (data.success) {
            setPostulations(data.results);
        }

    } catch (error) {
        handleNotifications("error", error.message);
    }

    setLoading(false);
}