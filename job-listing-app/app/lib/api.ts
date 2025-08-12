
const BASE_URL = 'https://akil-backend.onrender.com';

export async function fetchOpportunities() {
    try {
        const response = await fetch(`${BASE_URL}/opportunities/search`)
        if(!response.ok) {
            throw new Error('failed to fetch opportunities')
        }
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching opportunities:", error)
    }
}

export async function fetchOpportunityById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/opportunities/${id}`);
        if(!response.ok) {
            throw new Error("failed to fetch opportunity by Id")
        }

        const data = await response.json();
        return data.data

    } catch(error) {
        console.error("error fetching opportunity by Id:", error)
    }
}

export async function fetchBookmarks(accessToken: string) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`

            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data.data, "bookmarks data")
        return data.data || [];
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw error;
    }
}

export async function createBookmark(eventID: string, accessToken: string) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks/${eventID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create bookmark');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error creating bookmark:", error);
        throw error;
    }
}

export async function deleteBookmark(eventID: string, accessToken: string) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks/${eventID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`

            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete bookmark');
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        throw error;
    }
}