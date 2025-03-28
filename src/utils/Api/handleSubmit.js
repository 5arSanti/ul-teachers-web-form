import { handleNotifications } from "../handleNotifications";
import { reloadLocation } from "../realoadLocation";

export const handleSubmit = async (event, setLoading, values) => {
    event.preventDefault();
    setLoading(true);

    localStorage.setItem("form", JSON.stringify(values));

    try {
        const response = await fetch(import.meta.env.VITE_API_GOOGLE_APP_SHEET, {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("sended", true);
            handleNotifications("success", data.message);
        }
        reloadLocation(1000)

    }
    catch (error) {
        handleNotifications("error", "Error al enviar la información, intentelo de nuevo");
        reloadLocation(2000)
    }

    setLoading(false);
}